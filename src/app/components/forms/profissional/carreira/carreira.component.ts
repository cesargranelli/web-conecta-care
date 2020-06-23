import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-carreira',
  templateUrl: './carreira.component.html',
  styleUrls: ['./carreira.component.css']
})
export class CarreiraComponent implements OnInit {

  carreiraForm: FormGroup;

  mascaraCelular: string = '(00) 00000-0000';

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.carreiraForm = this.formBuilder.group({
      conselho: ['', [Validators.required]],
      registroProfissional: [''],
      ufConselho: ['', [Validators.required]],
      areaAtendimento: ['', [Validators.required]],
      nomeReferencia1: [''],
      telefoneReferencia1: [''],
      nomeReferencia2: [''],
      telefoneReferencia2: [''],
      transporte: ['', [Validators.required]],
    });
  }

  onSubmit() {

  }

}
