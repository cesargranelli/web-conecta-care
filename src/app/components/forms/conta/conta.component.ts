import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-conta',
  templateUrl: './conta.component.html',
  styleUrls: ['./conta.component.css']
})
export class ContaComponent implements OnInit {

  contaForm: FormGroup;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.contaForm = this.formBuilder.group({
      tipo: ['', [Validators.required]],
      banco: ['', [Validators.required]],
      agencia: ['', [Validators.required, Validators.maxLength(60)]],
      numero: ['', [Validators.required, Validators.maxLength(60)]],
      digito: ['', [Validators.required, Validators.maxLength(60)]],
    });
  }

  onSubmit() {

  }

}
