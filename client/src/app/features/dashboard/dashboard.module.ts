import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './containers/dashboard/dashboard.component';
import { UsersComponent } from './components/users/users.component';

import { TalkSectionComponent } from './components/talk-section/talk-section.component';
import { MessageComponent } from './components/message/message.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [SharedModule, CommonModule, DashboardRoutingModule],
  declarations: [
    DashboardComponent,
    UsersComponent,
    TalkSectionComponent,
    MessageComponent,
  ],
})
export class DashboardModule {}
