import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { environment } from 'src/environments/environment';
import { LogginPersisterService } from './loggin-persister.service';

@Injectable({
  providedIn: 'root',
})
export class SignalrService {
  private hubConnection?: signalR.HubConnection;
  private baseUrl = environment.baseUrl.split('/api')[0];
  constructor(private logginPersister: LogginPersisterService) {}

  async startConnection(): Promise<void> {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl('http://localhost:5299/chat')
      .build();

    try {
      await this.hubConnection.start();
    } catch (error) {
      console.log(error);
    }
  }

  setConnectionId() {
    if (!this.hubConnection) return;
    const conId = this.hubConnection.connectionId;
    if (conId) {
      this.logginPersister.addSignalrConnectionId(conId);
    }
  }
}
