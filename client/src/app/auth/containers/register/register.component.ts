import { Component, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { InputField } from '../../models/input-field.interface';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  fields: InputField[] = [];
  constructor() {}

  ngOnInit(): void {
    this.generateFields();
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
    this.fields.push({
      type: 'password',
      label: 'Confirm Password',
      name: 'confirmPassword',
      value: '',
      placeholder: 'Confirm your password',
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
