import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { User } from 'src/app/shared/models/user.interface';
import { environment } from 'src/environments/environment';
import { UserToUpdateDto } from '../Dtos/userToUpdateDto.interface';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  baseUrl = environment.baseUrl;
  constructor(private http: HttpClient) {}

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.baseUrl + '/users');
  }

  getUser(id: string): Observable<User> {
    return this.http.get<User>(this.baseUrl + '/users/' + id);
  }

  updateUser(id: string | undefined, user: UserToUpdateDto): Observable<User> {
    return this.http.put<User>(this.baseUrl + '/users/' + id, user);
  }

  photoTest(file: File): Observable<User> {
    const formData: FormData = new FormData();
    formData.append('Image', file, file.name);
    return this.http.post<User>(this.baseUrl + '/users/photo', formData);
  }
}
