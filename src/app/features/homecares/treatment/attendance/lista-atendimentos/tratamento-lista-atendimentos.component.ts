import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgxMaskDirective, NgxMaskPipe } from 'ngx-mask';
import { SharedComponentModule } from 'src/app/shared/components/shared-component.module';
import { Component, Input, OnInit } from '@angular/core';
import { Atendimento } from 'src/app/core/models/atendimento-prontuario.model';

declare var jQuery: any;

@Component({
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, RouterModule, NgxMaskDirective, NgxMaskPipe, SharedComponentModule],
  selector: 'app-tratamento-lista-atendimentos',
  templateUrl: './tratamento-lista-atendimentos.component.html',
  styleUrls: ['./tratamento-lista-atendimentos.component.css'],
})
export class TratamentoListaAtendimentosComponent implements OnInit {
  @Input()
  public atendimentos: Array<Atendimento>;

  constructor() {}

  ngOnInit(): void {}
}
