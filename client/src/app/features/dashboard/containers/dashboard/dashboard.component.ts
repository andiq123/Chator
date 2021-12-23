import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { LogginPersisterService } from 'src/app/core/services/loggin-persister.service';
import { SignalrService } from 'src/app/core/services/signalr.service';
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
export class DashboardComponent implements OnInit {
  public User$!: Observable<User | null>;
  users: User[] = [];

  otherUser?: User;
  messages: Message[] = [];

  constructor(
    private userService: UsersService,
    private loginPersister: LogginPersisterService,
    private messageService: MessagesService,
    private signalrService: SignalrService
  ) {}

  async ngOnInit() {
    this.User$ = this.loginPersister.LoggedUser;
    this.populateUsers();
    await this.signalrService.startConnection();
    this.signalrService.setConnectionId();
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
      });
  }

  populateUsers() {
    this.userService.getUsers().subscribe((users) => {
      this.users = users.map((x) => Object.assign(new User(), x));
      this.otherUser = this.users[0];
      this.loadMessages();
    });
  }

  onSelectUser(user: User) {
    this.otherUser = user;
    this.loadMessages();
  }

  deleteMessage(messageId: string) {
    this.messageService.deleteMessage(messageId).subscribe(() => {
      this.messages = this.messages.filter((x) => x.id !== messageId);
    });
  }
}
