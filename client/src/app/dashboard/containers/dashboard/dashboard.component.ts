import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/auth/models/user.interface';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  users: User[] = [];

  constructor() {}

  ngOnInit(): void {
    this.generateUsers();
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
}
