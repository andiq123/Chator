import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { ReplaySubject, Subject, take } from 'rxjs';
import { MessageToAddDto } from 'src/app/features/dashboard/Dtos/messageToAdd.interface';
import { Message } from 'src/app/features/dashboard/models/message.interface';
import { User } from 'src/app/shared/models/user.interface';
import { environment } from 'src/environments/environment';
import { LogginPersisterService } from './loggin-persister.service';

@Injectable({
  providedIn: 'root',
})
export class SignalrService {
  private hubConnection?: signalR.HubConnection;
  private usersConnected: string[] = [];
  private baseUrl = environment.baseUrl;

  private deletedMessageSource = new Subject<string>();
  public DeletedMessage$ = this.deletedMessageSource.asObservable();

  private editedMessageSource = new Subject<{
    messageId: string;
    text: string;
  }>();
  public EditedMessage$ = this.editedMessageSource.asObservable();

  private recieveMessageSource = new Subject<Message>();
  public RecieveMessage$ = this.recieveMessageSource.asObservable();

  private userConnectedSource = new Subject<string>();
  public UserConnected$ = this.userConnectedSource.asObservable();

  private userDisconnectedSource = new Subject<string>();
  public UserDisconnected$ = this.userDisconnectedSource.asObservable();

  private usersConnectedSource = new Subject<string[]>();
  public UsersConnected$ = this.usersConnectedSource.asObservable();

  private registeredUserSource = new Subject<void>();
  public RegisteredUser$ = this.registeredUserSource.asObservable();

  private isWritingSource = new Subject<boolean>();
  public IsWriting$ = this.isWritingSource.asObservable();

  constructor() {}

  async startConnection(userId: string): Promise<void> {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl(`${this.baseUrl}/chat`)
      .configureLogging(signalR.LogLevel.None)
      .build();

    try {
      await this.hubConnection.start();
      this.addMySelfOnline(userId);
      this.listenToEvents();
    } catch (error) {
      console.log(error);
    }
  }

  addMySelfOnline(userId: string) {
    this.hubConnection?.invoke('AddMyselfOnline', userId);
  }

  listenToEvents() {
    // user connected
    this.hubConnection?.on('UserConnected', (userId: string) => {
      this.usersConnected.push(userId);
      this.userConnectedSource.next(userId);
    });

    // user disconnected
    this.hubConnection?.on('UserDisconnected', (userId: string) => {
      this.usersConnected = this.usersConnected.filter((x) => x !== userId);
      this.userDisconnectedSource.next(userId);
    });

    this.hubConnection?.on(
      'GetAllUsersOnline',
      (users: { userId: string; connectionId: string }[]) => {
        this.usersConnected = users.map((x) => x.userId);
        this.usersConnectedSource.next(this.usersConnected);
      }
    );

    this.hubConnection?.on('ReceiveMessage', (message: Message) => {
      this.recieveMessageSource.next(message);
    });

    this.hubConnection?.on('MessageDeleted', (messageId) => {
      this.deletedMessageSource.next(messageId);
    });

    this.hubConnection.on(
      'MessageEdited',
      (messageId: string, text: string) => {
        this.editedMessageSource.next({ messageId, text });
      }
    );

    this.hubConnection.on('RegisteredUser', () => {
      this.registeredUserSource.next();
    });

    this.hubConnection.on('isWriting', (status) => {
      this.isWritingSource.next(status);
    });
  }

  disconnect() {
    this.usersConnected = [];
    this.usersConnectedSource.next(this.usersConnected);
    this.hubConnection?.stop();
  }

  sendMessage(message: Message) {
    this.hubConnection?.invoke('SendMessage', message);
  }

  deleteMessage(userId: string, messageId: string) {
    this.hubConnection?.invoke('DeleteMessage', userId, messageId);
  }

  editMessage(userId: string, messageId: string, text: string) {
    this.hubConnection?.invoke('EditMessage', userId, messageId, text);
  }

  setIsWriting(userId: string, status: boolean) {
    this.hubConnection?.invoke('SetIsWriting', userId, status);
  }
}
