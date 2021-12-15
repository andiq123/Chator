import { ValidatorFn } from '@angular/forms';

export interface InputField {
  name: string;
  type: string;
  label: string;
  placeholder: string;
  value?: string;
  validators?: ValidatorFn[];
  minLength?: number;
  maxLength?: number;
}
