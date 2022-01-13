import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  firstValueFrom,
  lastValueFrom,
  Observable,
  Subscription,
  take,
} from 'rxjs';
import { LogginPersisterService } from 'src/app/core/services/loggin-persister.service';
import { SignalrService } from 'src/app/core/services/signalr.service';
import { SnackBarService } from 'src/app/core/services/snack-bar.service';
import { User } from 'src/app/shared/models/user.interface';
import { MessageToAddDto } from '../../Dtos/messageToAdd.interface';
import { Message } from '../../models/message.interface';
import { MessagesService } from '../../services/messages.service';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit, OnDestroy {
  subscriptions: Subscription[] = [];
  public User$!: Observable<User | null>;
  users: User[] = [];

  otherUser?: User;
  messages: Message[] = [];

  otherUserIsTyping = false;

  constructor(
    private userService: UsersService,
    private loginPersister: LogginPersisterService,
    private messageService: MessagesService,
    private signalrService: SignalrService,
    private snackBar: SnackBarService
  ) {}

  async ngOnDestroy() {
    this.signalrService.disconnect();
    this.subscriptions.forEach((x) => x.unsubscribe());
  }

  async ngOnInit() {
    this.User$ = this.loginPersister.LoggedUser$;
    this.populateUsers();
    this.subscriptions.push(
      this.User$.subscribe((user) => {
        if (!user) return;
        this.signalrService.startConnection(user.id);
        this.listenForSignalrActions();
      })
    );
  }

  populateUsers() {
    this.userService.getUsers().subscribe((users) => {
      this.users = users.map((x) => Object.assign(new User(), x));
    });
  }

  listenForSignalrActions() {
    this.signalrService.UserDisconnected$.subscribe((userId: string) => {
      const connectedUser = this.users.find((x) => x.id === userId);
      if (!connectedUser) return;
      connectedUser.isOnline = !connectedUser;
      this.sortUsers();
    });

    this.signalrService.UserConnected$.subscribe((userId: string) => {
      const connectedUser = this.users.find((x) => x.id === userId);
      if (!connectedUser) return;
      connectedUser.isOnline = !!connectedUser;
      this.sortUsers();
    });

    this.signalrService.UsersConnected$.subscribe((users) => {
      this.mapConnectedUsers(users);
    });

    this.signalrService.RecieveMessage$.subscribe((message) => {
      //check if message is from other user if not add unread messages
      if (message.senderId !== this.otherUser.id) {
        this.addUnreadMessages(message.senderId);
        return;
      }

      this.messages = [...this.messages, message];
    });

    this.signalrService.DeletedMessage$.subscribe((messageId) => {
      this.deleteMessage(messageId);
    });

    this.signalrService.EditedMessage$.subscribe(({ messageId, text }) => {
      this.updateMessage(messageId, text);
    });

    this.signalrService.RegisteredUser$.subscribe(() => {
      this.populateUsers();
      this.snackBar.info('A new user registered');
    });

    this.signalrService.IsWriting$.subscribe((status) => {
      this.otherUserIsTyping = status;
    });
  }

  loadMessages() {
    if (!this.otherUser) return;
    this.messages = [];
    this.messageService
      .getMessages(this.otherUser.id)
      .subscribe((messages: Message[]) => {
        this.messages = messages;
      });
  }

  sortUsers() {
    this.users = this.users.sort((a, b) => {
      if (a.isOnline && !b.isOnline) return -1;
      if (!a.isOnline && b.isOnline) return 1;
      return 0;
    });
  }

  //event handlers
  mapConnectedUsers(usersId: string[]) {
    this.users = this.users.map((user) => {
      if (usersId.includes(user.id!)) user.isOnline = true;
      return user;
    });

    this.sortUsers();
  }

  onSubmitMessage(messageToAddDto: MessageToAddDto) {
    this.messageService
      .createMessage(messageToAddDto)
      .subscribe((message: Message) => {
        this.messages = [...this.messages, message];
        this.signalrService.sendMessage(message);
      });
  }

  onSelectUser(user: User) {
    if (user.id === this.otherUser?.id) {
      this.otherUser = undefined;
      return;
    }

    this.otherUser = user;
    this.loadMessages();

    //reset unread messages
    this.resetUnreadMessages(user.id);
  }

  //signalr handlers
  deleteMessageReq(messageId: string) {
    this.messageService.deleteMessage(messageId).subscribe(() => {
      this.deleteMessage(messageId);
      this.signalrService.deleteMessage(this.otherUser.id, messageId);
      this.snackBar.success('Message deleted');
    });
  }

  editMessage(message: any) {
    if (!message) return;
    this.messageService
      .editMessage(message.id, message.text)
      .subscribe((messageFromDb: Message) => {
        this.signalrService.editMessage(
          this.otherUser.id,
          messageFromDb.id,
          messageFromDb.text
        );
        this.snackBar.success('Message edited');
      });
  }

  timeout = null;
  onTyping() {
    if (this.timeout) {
      clearTimeout(this.timeout);
    }

    this.setIsWriting(true);

    this.timeout = setTimeout(() => {
      this.setIsWriting(false);
    }, 500);
  }

  setIsWriting(status: boolean) {
    this.signalrService.setIsWriting(this.otherUser.id, status);
  }

  //private methods for signalr handlers
  updateMessage(messageId: string, text: string) {
    this.messages = this.messages.map((message) => {
      if (message.id === messageId) {
        message.text = text;
        //checks if exists to update then notify
        this.snackBar.info('The other user edited a message');
      }
      return message;
    });
  }

  deleteMessage(messageId: string) {
    //checks if exists to delete then notify
    if (this.messages.find((x) => x.id === messageId)) {
      this.snackBar.info('The other user deleted a message');
    }
    this.messages = this.messages.filter((x) => x.id !== messageId);
  }

  addUnreadMessages(senderId: string) {
    this.users = this.users.map((x) => {
      if (x.id === senderId) {
        x.unreaMessages++;
      }
      return x;
    });
  }

  resetUnreadMessages(userId: string) {
    this.users = this.users.map((x) => {
      if (x.id === userId) {
        x.unreaMessages = 0;
      }
      return x;
    });
  }
}
