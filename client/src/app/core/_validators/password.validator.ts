import { AbstractControl } from '@angular/forms';

export class PasswordValidators {
  static MatchPassword(control: AbstractControl) {
    let password = control.get('password').value;
    let confirmPassword = control.get('confirmPassword').value;
    if (password != confirmPassword) {
      control.get('confirmPassword').setErrors({ MatchPassword: true });
    }
  }

  static AtLeastOneNumber(control: AbstractControl) {
    let password = control.get('password').value;
    if (!/\d/.test(password)) {
      control.get('password').setErrors({ AtLeastOneNumber: true });
    }
  }

  static AtLeastABigLetter(control: AbstractControl) {
    let password = control.get('password').value;
    if (!/[A-Z]/.test(password)) {
      control.get('password').setErrors({ AtLeastABigLetter: true });
    }
  }

  static AtLeastALowerCaseLetter(control: AbstractControl) {
    let password = control.get('password').value;
    if (!/[a-z]/.test(password)) {
      control.get('password').setErrors({ AtLeastALowerCaseLetter: true });
    }
  }

  static AtLeastASpecialCharacter(control: AbstractControl) {
    let password = control.get('password').value;
    if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) {
      control.get('password').setErrors({ AtLeastASpecialCharacter: true });
    }
  }
}
