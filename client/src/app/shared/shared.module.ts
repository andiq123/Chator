import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatMenuModule } from '@angular/material/menu';
import { TextInputComponent } from './components/text-input/text-input.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';

const MaterialsModules = [
  MatButtonModule,
  MatIconModule,
  MatDividerModule,
  MatFormFieldModule,
  MatInputModule,
  MatCardModule,
  MatToolbarModule,
  MatMenuModule,
  MatSnackBarModule,
];

@NgModule({
  declarations: [TextInputComponent],
  imports: [
    CommonModule,
    MaterialsModules,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
  ],
  exports: [
    MaterialsModules,
    ReactiveFormsModule,
    HttpClientModule,
    TextInputComponent,
    FormsModule,
  ],
})
export class SharedModule {}
