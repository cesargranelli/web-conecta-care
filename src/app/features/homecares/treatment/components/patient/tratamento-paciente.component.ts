import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgxMaskDirective, NgxMaskPipe } from 'ngx-mask';

import { Component, Input, OnInit } from '@angular/core';
import { PacienteTratamentoAberto } from 'src/app/features/homecares/models/paciente-tratamento-aberto.model';

@Component({
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, RouterModule, NgxMaskDirective, NgxMaskPipe],
  selector: 'app-tratamento-paciente',
  templateUrl: './tratamento-paciente.component.html',
  styleUrls: ['./tratamento-paciente.component.css']
})
export class TratamentoPacienteComponent implements OnInit {

  @Input()
  paciente: PacienteTratamentoAberto;

  constructor() { }

  ngOnInit(): void {
  }

  idade(dataNascimento: string) {
    if (dataNascimento) {
      let hoje: Date = new Date();
      let nascimento: Date = new Date(dataNascimento);
      let diferencaAnos = hoje.getFullYear() - nascimento.getFullYear();
      if (new Date(hoje.getFullYear(), hoje.getMonth(), hoje.getDate()) <
        new Date(hoje.getFullYear(), nascimento.getMonth(), nascimento.getDate()))
        diferencaAnos--;
      return diferencaAnos;
    }
  }

}

