import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { InputField } from '../../models/input-field.interface';

@Component({
  selector: 'app-form-container',
  templateUrl: './form-container.component.html',
  styleUrls: ['./form-container.component.scss'],
})
export class FormContainerComponent implements OnInit {
  @Input() fields: InputField[] = [];
  @Input() title?: string;
  formGroup!: FormGroup;
  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.createFormGroup();
  }

  createFormGroup() {
    const group = this.fb.group({});
    this.fields.forEach((field) => {
      if (field.type === 'button') return;
      group.addControl(
        field.name,
        this.fb.control(field.value, field.validators)
      );
      this.formGroup = group;
    });
  }
}
