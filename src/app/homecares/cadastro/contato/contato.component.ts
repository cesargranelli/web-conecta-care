import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-contato',
  templateUrl: './contato.component.html',
  styleUrls: ['./contato.component.css']
})
export class ContatoComponent implements OnInit {

  public contatoFormGroup: FormGroup;
  public hideForm: boolean = true;

  constructor(private _formBuilder: FormBuilder) {
    this.contatoFormGroup = this._formBuilder.group({
      telefoneFixo: [null, Validators.required],
      telefoneRecado: [null, Validators.required],
      celular: [null, Validators.required],
      atendimentoWhatsapp: [null],
      nomeEmpresaHomeCare: [null, Validators.required]
    });
  }

  ngOnInit(): void {
    this.hideForm = false;
  }


  onSubmit() {
  }
}
