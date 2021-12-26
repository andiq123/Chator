import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { BehaviorSubject, Subject, take } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UserConnected } from '../models/userConnected.interface';
import { LogginPersisterService } from './loggin-persister.service';

@Injectable({
  providedIn: 'root',
})
export class SignalrService {
  private hubConnection?: signalR.HubConnection;
  private usersConnected: UserConnected[] = [];
  private userConnectedSource = new Subject<UserConnected>();
  public UserConnected$ = this.userConnectedSource.asObservable();
  private userDisconnectedSource = new Subject<UserConnected>();
  public UserDisconnected$ = this.userDisconnectedSource.asObservable();

  private baseUrl = environment.baseUrl.split('/api')[0];
  constructor(private logginPersister: LogginPersisterService) {}

  async startConnection(): Promise<void> {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl(`${this.baseUrl}/chat`)
      .build();

    try {
      await this.hubConnection.start();
      this.setConnectionId();
      this.addMySelfOnline();
      this.listenToEvents();
    } catch (error) {
      console.log(error);
    }
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
    this.hubConnection?.on(
      'UserConnected',
      (userId: string, connectionId: string) => {
        this.usersConnected.push({ userId, connectionId });
        this.userConnectedSource.next({ userId, connectionId });
      }
    );

    // user disconnected
    this.hubConnection?.on('UserDisconnected', (connectionId: string) => {
      this.usersConnected = this.usersConnected.filter(
        (x) => x.connectionId !== connectionId
      );
      this.userDisconnectedSource.next({ connectionId });
    });
  }

  setConnectionId() {
    if (!this.hubConnection) return;
    const conId = this.hubConnection.connectionId;
    if (!conId) return;
    this.logginPersister.addSignalrConnectionId(conId);
  }

  disconnect() {
    this.hubConnection?.stop();
  }
}
