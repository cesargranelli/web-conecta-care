import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-complemento',
  templateUrl: './complemento.component.html',
  styleUrls: ['./complemento.component.css']
})
export class ComplementoComponent implements OnInit {

  complementoForm: FormGroup;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.complementoForm = this.formBuilder.group({
      tituloEleitoral: ['', [Validators.required]],
      zonaEleitoral: ['', [Validators.required]],
      secaoEleitoral: ['', [Validators.required]],
      numeroHabilitacao: ['', [Validators.required]],
      dataValidadeHabilitacao: ['', [Validators.required]],
      categoriaCNH: ['', [Validators.required]],
      numeroReservista: ['', [Validators.required]],
      nomeMae: ['', [Validators.required]],
      profissaoMae: ['', [Validators.required]],
      nomePai: ['', [Validators.required]],
      profissaoPai: ['', [Validators.required]],
      nomeConjuge: ['', [Validators.required]],
      profissaoConjuge: ['', [Validators.required]],
      filhos: ['', [Validators.required]],
      carteiraVacinacao: ['', [Validators.required]],
    });
  }

  onSubmit() {

  }

}
