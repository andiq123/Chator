import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { ReplaySubject, Subject, take } from 'rxjs';
import { User } from 'src/app/shared/models/user.interface';
import { environment } from 'src/environments/environment';
import { LogginPersisterService } from './loggin-persister.service';

@Injectable({
  providedIn: 'root',
})
export class SignalrService {
  private hubConnection?: signalR.HubConnection;
  private usersConnected: string[] = [];
  private userConnectedSource = new Subject<string>();
  public UserConnected$ = this.userConnectedSource.asObservable();
  private userDisconnectedSource = new Subject<string>();
  public UserDisconnected$ = this.userDisconnectedSource.asObservable();

  private usersConnectedSource = new ReplaySubject<string[]>();
  public usersConnected$ = this.usersConnectedSource.asObservable();

  private baseUrl = environment.baseUrl.split('/api')[0];
  constructor(private logginPersister: LogginPersisterService) {}

  async startConnection(): Promise<void> {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl(`${this.baseUrl}/chat`)
      .build();

    try {
      await this.hubConnection.start();
      this.addMySelfOnline();
      this.invokeGetAllUsersOnline();
      this.listenToEvents();
    } catch (error) {
      console.log(error);
    }
  }

  invokeGetAllUsersOnline() {
    this.hubConnection?.invoke('GetAllUsersOnline');
  }

  addMySelfOnline() {
    this.logginPersister.LoggedUser.pipe(take(1)).subscribe((user) => {
      if (user) {
        this.hubConnection?.invoke('AddMyselfOnline', user.id);
      }
    });
  }

  listenToEvents() {
    // user connected
    this.hubConnection?.on('UserConnected', (userId: string) => {
      this.usersConnected.push(userId);
      this.userConnectedSource.next(userId);
    });

    // user disconnected
    this.hubConnection?.on('UserDisconnected', (userId: string) => {
      console.log(userId);
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
  }

  disconnect() {
    this.logginPersister.LoggedUser.pipe(take(1)).subscribe((user) => {
      if (!user) return;
      this.usersConnected = this.usersConnected.filter((x) => x !== user.id);
      this.hubConnection?.stop();
    });
  }
}
