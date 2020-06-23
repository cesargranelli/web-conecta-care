import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-contato',
  templateUrl: './contato.component.html',
  styleUrls: ['./contato.component.css']
})
export class ContatoComponent implements OnInit {

  contatoForm: FormGroup;

  mascaraCelular: string = '(00) 00000-0000';
  mascaraTelefone: string = '(00) 0000-0000';

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.contatoForm = this.formBuilder.group({
      telefoneFixo: [''],
      telefoneRecado: [''],
      celularPrincipal: ['', [Validators.required]],
      celularSecundario: [''],
    });
  }

  onSubmit() {

  }

}
