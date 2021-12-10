import { Component, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthResponse } from 'src/app/shared/models/auth-response.interface';
import { InputField } from 'src/app/shared/models/input-field.interface';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  fields: InputField[] = [];
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.generateFields();
  }

  submit(values: any) {
    this.authService.login(values).subscribe();
  }

  generateFields() {
    this.fields.push({
      type: 'text',
      label: 'Username',
      name: 'username',
      value: '',
      placeholder: 'Enter your username',
      minLength: 3,
      maxLength: 10,
      validators: [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(10),
      ],
    });
    this.fields.push({
      type: 'password',
      label: 'Password',
      name: 'password',
      value: '',
      placeholder: 'Enter your password',
      minLength: 6,
      maxLength: 10,
      validators: [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(10),
      ],
    });
  }
}