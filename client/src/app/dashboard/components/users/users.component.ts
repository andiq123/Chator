import { Component, Input, OnInit } from '@angular/core';
import { User } from 'src/app/auth/models/user.interface';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
  @Input() users: User[] = [];
  constructor() {}

  ngOnInit(): void {}
}
