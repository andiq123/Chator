import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavComponent } from './components/nav/nav.component';
import { SharedModule } from '../shared/shared.module';
import { HomeComponent } from './components/home/home.component';
import { RouterModule } from '@angular/router';
import { NotFoundComponent } from './components/not-found/not-found.component';

@NgModule({
  declarations: [NavComponent, HomeComponent, NotFoundComponent],
  imports: [CommonModule, SharedModule, RouterModule],
  exports: [NavComponent, HomeComponent, RouterModule],
})
export class CoreModule {}
