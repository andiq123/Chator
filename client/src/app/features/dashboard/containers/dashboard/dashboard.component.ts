import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/shared/models/user.interface';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  users: User[] = [];
  user?: User;
  otherUser?: User;

  constructor(private userService: UsersService) {}

  ngOnInit(): void {
    this.populateUsers();
  }
  populateUsers() {
    this.userService.getUsers().subscribe((users) => {
      this.users = users;
    });
  }

  onSelectUser(user: User) {
    this.otherUser = user;
  }
}
