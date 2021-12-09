import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/shared/models/user.interface';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  users: User[] = [];
  user?: User;
  otherUser?: User;

  constructor() {}

  ngOnInit(): void {
    this.generateUsers();
    this.user = this.users[0];
    this.otherUser = this.users[1];
  }

  generateUsers() {
    this.users = [];
    for (let i = 0; i < 10; i++) {
      this.users.push({
        id: `${i}`,
        username: `User ${i}`,
        password: '',
        photoURL: `https://robohash.org/${i}`,
      });
    }
  }

  onSelectUser(user: User) {
    this.otherUser = user;
  }
}
