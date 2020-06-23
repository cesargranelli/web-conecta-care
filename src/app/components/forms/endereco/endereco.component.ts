import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-endereco',
  templateUrl: './endereco.component.html',
  styleUrls: ['./endereco.component.css']
})
export class EnderecoComponent implements OnInit {

  enderecoForm: FormGroup;

  mascaraCep: string = '00000-000';

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.enderecoForm = this.formBuilder.group({
      logradouro: ['', [Validators.required, Validators.maxLength(40)]],
      numero: ['', [Validators.required, Validators.maxLength(60)]],
      complemento: ['', [Validators.required]],
      cep: ['', [Validators.required]],
      bairro: ['', [Validators.required]],
      cidade: ['', []],
      comprovante: ['', [Validators.required]],
      uf: ['', []],
    });
  }

  onSubmit() {

  }

}
