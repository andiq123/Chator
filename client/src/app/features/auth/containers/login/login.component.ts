import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { TokenStorageHelper } from 'src/app/core/helpers/token-storage.helper';
import { LogginPersisterService } from 'src/app/core/services/loggin-persister.service';
import { SnackBarService } from 'src/app/core/services/snack-bar.service';
import { PasswordValidators } from 'src/app/core/_validators/password.validator';
import { AuthResponse } from 'src/app/shared/models/auth-response.interface';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  formGroup!: FormGroup;
  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private snackBar: SnackBarService,
    private logginPersister: LogginPersisterService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.createForm();
  }

  submit() {
    this.snackBar.info('Logging in...');
    this.authService.login(this.formGroup.value).subscribe({
      next: (data: AuthResponse) => {
        TokenStorageHelper.setAccessToken(
          data.token,
          this.formGroup.value.rememberMe
        );
        this.logginPersister.setLoggedUser();
        this.router.navigate(['/dashboard']);
        this.snackBar.success('Logged In');
      },
      error: (e) => {
        this.snackBar.error(e.error.message);
      },
    });
  }

  createForm() {
    this.formGroup = this.fb.group(
      {
        username: [
          '',
          [
            Validators.required,
            Validators.minLength(5),
            Validators.maxLength(10),
          ],
        ],
        password: [
          '',
          [
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(10),
          ],
        ],
        rememberMe: [false],
      },
      {
        validators: [
          PasswordValidators.AtLeastASpecialCharacter,
          PasswordValidators.AtLeastOneNumber,
          PasswordValidators.AtLeastABigLetter,
          PasswordValidators.AtLeastALowerCaseLetter,
        ],
      }
    );
  }
}
