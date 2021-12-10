import { Component, OnInit } from '@angular/core';
import { LogginPersisterService } from './core/services/loggin-persister.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'client';
  constructor(private logginPersisterService: LogginPersisterService) {}
  ngOnInit(): void {
    if (localStorage.getItem('token')) {
      this.logginPersisterService.setLoggedUser();
    }
  }
}
