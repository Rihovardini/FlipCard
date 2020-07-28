import { AbstractControl, ValidationErrors } from '@angular/forms';

export function notEmpty (control: AbstractControl): ValidationErrors | null  {
  const { value } = control;

  return value.trim() ? null : { required: true };
}