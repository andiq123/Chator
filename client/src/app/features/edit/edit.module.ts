import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditRoutingModule } from './edit-routing.module';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [EditProfileComponent],
  imports: [CommonModule, EditRoutingModule, SharedModule],
})
export class EditModule {}
