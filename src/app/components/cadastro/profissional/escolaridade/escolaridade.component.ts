import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-escolaridade',
  templateUrl: './escolaridade.component.html',
  styleUrls: ['./escolaridade.component.css']
})
export class EscolaridadeComponent implements OnInit {

  escolaridadeForm: FormGroup;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.escolaridadeForm = this.formBuilder.group({
      instrucao: ['', [Validators.required]],
      instituicaoEnsino: ['', [Validators.required]],
      anoConclusao: ['', [Validators.required, Validators.maxLength(60)]],
    });
  }

  onSubmit() {

  }

}
