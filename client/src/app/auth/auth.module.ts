import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './containers/login/login.component';
import { RegisterComponent } from './containers/register/register.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthRouterModule } from './auth-router.module';
import { SharedModule } from '../shared/shared.module';
import { FormContainerComponent } from './components/form-container/form-container.component';

@NgModule({
  declarations: [LoginComponent, RegisterComponent, FormContainerComponent],
  imports: [CommonModule, ReactiveFormsModule, AuthRouterModule, SharedModule],
  exports: [AuthRouterModule],
})
export class AuthModule {}
