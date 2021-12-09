import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './containers/dashboard/dashboard.component';
import { UsersComponent } from './components/users/users.component';
import { SharedModule } from '../shared/shared.module';
import { TalkSectionComponent } from './components/talk-section/talk-section.component';
import { MessageComponent } from './components/message/message.component';

@NgModule({
  declarations: [DashboardComponent, UsersComponent, TalkSectionComponent, MessageComponent],
  imports: [CommonModule, SharedModule, DashboardRoutingModule],
})
export class DashboardModule {}
