import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { InputField } from '../../models/input-field.interface';

@Component({
  selector: 'app-form-container',
  templateUrl: './form-container.component.html',
  styleUrls: ['./form-container.component.scss'],
})
export class FormContainerComponent implements OnInit {
  @Input() fields: InputField[] = [];
  @Input() title?: string;
  @Input() settings: { registerForm: boolean } = { registerForm: true };
  @Input() resetOnSubmit: boolean = false;
  @Output() onSubmit: EventEmitter<object> = new EventEmitter<object>();
  @Output() onFileSelected: EventEmitter<File> = new EventEmitter<File>();
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

  submit() {
    if (this.formGroup.invalid) return;
    this.onSubmit.emit(this.formGroup.value);
    if (!this.resetOnSubmit) return;
    this.formGroup.reset();
  }

  onFileChanged(event: any) {
    this.onFileSelected.emit(event);
  }
}
