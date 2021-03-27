import { Component, Input, OnChanges } from '@angular/core';

declare var jQuery: any;

@Component({
  selector: 'app-form-password-validation',
  templateUrl: './form-password-validation.component.html',
  styleUrls: ['./form-password-validation.component.css']
})
export class FormPasswordValidationComponent implements OnChanges {

  @Input()
  public password: string;

  private readonly PATTERN_MINIMO    = 8;
  private readonly PATTERN_MAXIMO    = 20;
  private readonly PATTERN_MAIUSCULA = '[A-Z]';
  private readonly PATTERN_MINUSCULA = '[a-z]';
  private readonly PATTERN_NUMERO    = '[0-9]';
  private readonly PATTERN_ESPECIAL  = '[!@#$%¨&*()-+=<,>.:;?/]';

  constructor() { }

  ngOnChanges(): void {
    this.minimo;
    this.maximo;
    this.maiuscula;
    this.minuscula;
    this.numero;
    this.especial;
  }

  get minimo(): string {
    return (this.password.length < this.PATTERN_MINIMO) ? 'show' : '';
  }

  get maximo(): string {
    return (this.password.length > this.PATTERN_MAXIMO) ? 'show' : '';
  }

  get maiuscula(): string {
    return (this.password.match(this.PATTERN_MAIUSCULA)) ? '' : 'show';
  }

  get minuscula(): string {
    return (this.password.match(this.PATTERN_MINUSCULA)) ? '' : 'show';
  }

  get numero(): string {
    return (this.password.match(this.PATTERN_NUMERO)) ? '' : 'show';
  }

  get especial(): string {
    return (this.password.match(this.PATTERN_ESPECIAL)) ? '' : 'show';
  }

}
