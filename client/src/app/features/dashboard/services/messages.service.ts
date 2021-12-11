import { HttpClient } from '@angular/common/http';

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { messageToAddDto } from '../Dtos/messageToAdd.interface';
import { Message } from '../models/message.interface';

@Injectable({
  providedIn: 'root',
})
export class MessagesService {
  baseUrl = environment.baseUrl;
  constructor(private http: HttpClient) {}

  getMessages(otherUserId: string): Observable<Message[]> {
    return this.http.get<Message[]>(this.baseUrl + '/messages/' + otherUserId);
  }

  getMessage(id: string) {
    return this.http.get(this.baseUrl + '/messages/' + id);
  }

  createMessage(message: messageToAddDto): Observable<Message> {
    return this.http.post<Message>(this.baseUrl + '/messages', message);
  }
}
