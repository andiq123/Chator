import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TokenStorageHelper } from 'src/app/core/helpers/token-storage.helper';
import { LogginPersisterService } from 'src/app/core/services/loggin-persister.service';
import { SnackBarService } from 'src/app/core/services/snack-bar.service';
import { PasswordValidators } from 'src/app/core/_validators/password.validator';
import { AuthResponse } from 'src/app/shared/models/auth-response.interface';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  formGroup!: FormGroup;

  constructor(
    private authService: AuthService,
    private router: Router,
    private fb: FormBuilder,
    private snackBar: SnackBarService,
    private logginPersister: LogginPersisterService
  ) {}

  ngOnInit(): void {
    this.createForm();
  }

  submit() {
    this.snackBar.info('Registering...');
    this.authService.register(this.formGroup.value).subscribe({
      next: (data: AuthResponse) => {
        TokenStorageHelper.setAccessToken(data.token);
        this.logginPersister.setLoggedUser();
        this.router.navigate(['/dashboard']);
        this.snackBar.success('Registered and Logged In');
      },
      error: (e) => {
        this.snackBar.error(e.error.message);
      },
    });
  }

  createForm() {
    //create the register form with the form builder
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
        description: [''],
        password: [
          '',
          [
            Validators.required,
            Validators.minLength(8),
            Validators.maxLength(20),
          ],
        ],
        confirmPassword: [
          '',
          [
            Validators.required,
            Validators.minLength(8),
            Validators.maxLength(20),
          ],
        ],
      },
      {
        validators: [
          PasswordValidators.MatchPassword,
          PasswordValidators.AtLeastASpecialCharacter,
          PasswordValidators.AtLeastOneNumber,
          PasswordValidators.AtLeastABigLetter,
          PasswordValidators.AtLeastALowerCaseLetter,
        ],
      }
    );
  }
}
