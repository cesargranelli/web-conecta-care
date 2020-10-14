import { AbstractControl } from '@angular/forms';

export class InputValidation {

  public validation(input: AbstractControl): string {
    if (input?.pristine) {
      return '';
    } else if (input?.invalid || input?.errors?.required) {
      return 'clear';
    } else {
      return 'done';
    }
  }

}
