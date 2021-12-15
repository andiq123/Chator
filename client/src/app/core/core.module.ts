import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavComponent } from './components/nav/nav.component';
import { SharedModule } from '../shared/shared.module';
import { HomeComponent } from './components/home/home.component';
import { RouterModule } from '@angular/router';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { NgxSpinnerModule } from 'ngx-spinner';

@NgModule({
  declarations: [NavComponent, HomeComponent, NotFoundComponent],
  imports: [CommonModule, SharedModule, RouterModule, NgxSpinnerModule],
  exports: [NavComponent, HomeComponent, RouterModule, NgxSpinnerModule],
})
export class CoreModule {}
