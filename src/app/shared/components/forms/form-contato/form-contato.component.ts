import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgxMaskDirective } from 'ngx-mask';
import { InputValidationHas } from 'src/app/shared/validations/input-validation-has';

@Component({
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NgxMaskDirective],
  selector: 'app-form-contato',
  templateUrl: './form-contato.component.html',
  styleUrls: ['./form-contato.component.css']
})
export class FormContatoComponent implements OnInit {

  @Input() public isCadastro: boolean;
  @Input() public linkBotaoVoltar: string;
  @Input() public labelBotaoSubmit: string = 'Salvar';
  @Input() public hideForm: boolean = true;

  @Output() public onSubmitEvent = new EventEmitter<any>();
  @Output() public onReturnEvent = new EventEmitter<void>();
  @Output() public onClearEvent = new EventEmitter<void>();

  public contatoForm: FormGroup;
  public validationHas: InputValidationHas = new InputValidationHas();

  constructor(private _formBuilder: FormBuilder) {
    this.contatoForm = this._formBuilder.group({
      telefoneFixo: [null],
      telefoneRecado: [null],
      telefoneCelular: [null],
      telefoneWhatsapp: [null],
      flagAceiteDeclaracao: [null],
      email: [null, [Validators.required, Validators.email, Validators.maxLength(100)]]
    });
  }

  ngOnInit(): void {
    if (this.isCadastro) {
      this.contatoForm.get('flagAceiteDeclaracao').setValidators(Validators.requiredTrue);
    }
  }

  onReturn(): void {
    this.onReturnEvent.emit();
  }

  limparForm(): void {
    this.contatoForm.reset();
    this.onClearEvent.emit();
  }

  onSubmit(): void {
    this.onSubmitEvent.emit(this.contatoForm.value);
  }
}
