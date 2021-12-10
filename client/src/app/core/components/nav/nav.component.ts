import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/shared/models/user.interface';
import { LogginPersisterService } from '../../services/loggin-persister.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
})
export class NavComponent implements OnInit {
  LoggedUser?: Observable<User | null>;
  constructor(private logginPersister: LogginPersisterService) {}

  ngOnInit(): void {
    this.LoggedUser = this.logginPersister.LoggedUser;
  }

  signOut() {
    this.logginPersister.signOut();
  }
}
