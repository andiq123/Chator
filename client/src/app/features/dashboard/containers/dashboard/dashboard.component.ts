import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
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
  public User$!: Observable<User | null>;
  users: User[] = [];

  otherUser?: User;
  messages: Message[] = [];

  constructor(
    private userService: UsersService,
    private loginPersister: LogginPersisterService,
    private messageService: MessagesService,
    private signalrService: SignalrService,
    private snackBar: SnackBarService
  ) {}

  ngOnDestroy(): void {
    this.signalrService.disconnect();
  }

  async ngOnInit() {
    this.User$ = this.loginPersister.LoggedUser;
    this.populateUsers();
    await this.signalrService.startConnection();
    this.ListenForConnections();
  }

  mapConnectedUsers(usersId: string[]) {
    this.users = this.users.map((user) => {
      if (usersId.includes(user.id!)) user.isOnline = true;
      return user;
    });

    this.sortUsers();
  }

  ListenForConnections() {
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

    this.signalrService.usersConnected$.subscribe((users) => {
      this.mapConnectedUsers(users);
    });

    this.signalrService.RecieveMessage$.subscribe((message) => {
      this.messages = [...this.messages, message];
    });

    this.signalrService.DeletedMessage$.subscribe((messageId) => {
      this.deleteMessage(messageId);
      this.snackBar.info('The other user deleted a message');
    });

    this.signalrService.EditedMessage$.subscribe(({ messageId, text }) => {
      this.updateMessage(messageId, text);
      this.snackBar.info('The other user edited a message');
    });
  }

  updateMessage(messageId: string, text: string) {
    this.messages = this.messages.map((message) => {
      if (message.id === messageId) {
        message.text = text;
      }
      return message;
    });
  }

  sortUsers() {
    this.users = this.users.sort((a, b) => {
      if (a.isOnline && !b.isOnline) return -1;
      if (!a.isOnline && b.isOnline) return 1;
      return 0;
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

  onSubmitMessage(messageToAddDto: MessageToAddDto) {
    this.messageService
      .createMessage(messageToAddDto)
      .subscribe((message: Message) => {
        this.messages = [...this.messages, message];
        this.signalrService.sendMessage(message);
      });
  }

  populateUsers() {
    this.userService.getUsers().subscribe((users) => {
      this.users = users.map((x) => Object.assign(new User(), x));
      //debug only
      // this.otherUser = this.users[0];
      // this.loadMessages();
    });
  }

  onSelectUser(user: User) {
    this.otherUser = user;
    this.loadMessages();
  }

  deleteMessage(messageId: string) {
    this.messages = this.messages.filter((x) => x.id !== messageId);
  }

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
}
