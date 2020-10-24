import {AbstractControl} from '@angular/forms';

export class InputValidationHas {

  public validation(input: AbstractControl): string {
    if (input?.pristine) {
      return '';
    } else if (input?.invalid || input?.errors?.required) {
      return 'has-danger';
    } else {
      return 'has-success';
    }
  }

}
