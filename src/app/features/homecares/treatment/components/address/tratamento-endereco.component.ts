import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgxMaskDirective, NgxMaskPipe } from 'ngx-mask';
import { SharedComponentModule } from 'src/app/shared/components/shared-component.module';
import { Component, Input, OnInit } from '@angular/core';
import { EnderecoPaciente } from 'src/app/features/patients/models/endereco-paciente.model';

@Component({
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, RouterModule, NgxMaskDirective, NgxMaskPipe, SharedComponentModule],
  selector: 'app-tratamento-endereco',
  templateUrl: './tratamento-endereco.component.html',
  styleUrls: ['./tratamento-endereco.component.css']
})
export class TratamentoEnderecoComponent implements OnInit {

  @Input()
  endereco: EnderecoPaciente;

  constructor() { }

  ngOnInit(): void {
  }

}
