import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-experiencia',
  templateUrl: './experiencia.component.html',
  styleUrls: ['./experiencia.component.css']
})
export class ExperienciaComponent implements OnInit {

  experienciaForm: FormGroup;

  mascaraData: string = '00/00/0000';

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.experienciaForm = this.formBuilder.group({
      experiencia: ['', [Validators.required]],
      observacao: ['', [Validators.required]],
      empresa: ['', [Validators.required, Validators.maxLength(60)]],
      cargo: ['', [Validators.required]],
      dataAdmissao: ['', [Validators.required]],
      dataDemissao: ['', []],
    });
  }

  onSubmit() {

  }

}
