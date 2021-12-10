import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { User } from 'src/app/shared/models/user.interface';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
  @Input() users: User[] = [];
  @Output() onSelectUser: EventEmitter<User> = new EventEmitter<User>();
  constructor() {}

  ngOnInit(): void {}

  selectUser(user: User): void {
    this.onSelectUser.emit(user);
  }
}
