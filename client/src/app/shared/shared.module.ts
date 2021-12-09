import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { FormContainerComponent } from './components/form-container/form-container.component';
import { ReactiveFormsModule } from '@angular/forms';

const MaterialsModules = [
  MatButtonModule,
  MatIconModule,
  MatDividerModule,
  MatFormFieldModule,
  MatInputModule,
  MatCardModule,
  MatToolbarModule,
];

@NgModule({
  declarations: [FormContainerComponent],
  imports: [CommonModule, MaterialsModules, ReactiveFormsModule],
  exports: [MaterialsModules, FormContainerComponent, ReactiveFormsModule],
})
export class SharedModule {}
