import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgxMaskDirective, NgxMaskPipe } from 'ngx-mask';
import { Component, Input, OnInit } from '@angular/core';
import { Especialidade } from 'src/app/core/models/especialidade.class';
import { ProfissionalTratamentoAberto } from 'src/app/features/homecares/models/profissional-tratamento-aberto.model';

@Component({
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, RouterModule, NgxMaskDirective, NgxMaskPipe],
  selector: 'app-tratamento-profissional',
  templateUrl: './tratamento-profissional.component.html',
  styleUrls: ['./tratamento-profissional.component.css']
})
export class TratamentoProfissionalComponent implements OnInit {

  @Input()
  profissional: ProfissionalTratamentoAberto;

  constructor() { }

  ngOnInit(): void {
  }

  especialidades(especialidades: Especialidade[]): any {
    if (!!especialidades)
      return especialidades?.map(especialidade => especialidade?.nome);
    return '';
  }

}
