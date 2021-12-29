import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class SnackBarService {
  constructor(private _snackBar: MatSnackBar) {}

  success(message: string, duration: number = 5000) {
    this._snackBar.open(message, '', {
      duration,
      panelClass: ['snackbar-success'],
    });
  }

  info(message: string, duration: number = 5000) {
    this._snackBar.open(message, '', {
      duration,
      panelClass: ['snackbar-info'],
    });
  }
  
  error(message: string, duration: number = 5000) {
    this._snackBar.open(message, '', {
      duration,
      panelClass: ['snackbar-error'],
    });
  }
}
