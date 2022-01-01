import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/shared/models/user.interface';
import { LogginPersisterService } from '../../services/loggin-persister.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  User$: Observable<User> | null;
  constructor(private logginPersister: LogginPersisterService) {}

  ngOnInit(): void {
    this.User$ = this.logginPersister.LoggedUser;
  }
}
