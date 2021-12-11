import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { LogginPersisterService } from 'src/app/core/services/loggin-persister.service';
import { User } from 'src/app/shared/models/user.interface';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  users: User[] = [];
  public user$!: Observable<User | null>;
  otherUser?: User;

  constructor(
    private userService: UsersService,
    private loginPersister: LogginPersisterService
  ) {}

  ngOnInit(): void {
    this.user$ = this.loginPersister.LoggedUser;
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
