import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgxMaskDirective, NgxMaskPipe } from 'ngx-mask';

import { Component, Input, OnInit } from '@angular/core';
import { Atendimento } from 'src/app/features/homecares/models/atendimento-prontuario.model';

@Component({
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, RouterModule, NgxMaskDirective, NgxMaskPipe],
  selector: 'app-card-atendimentos',
  templateUrl: './card-atendimentos.component.html',
  styleUrls: ['./card-atendimentos.component.css'],
})
export class CardAtendimentosComponent implements OnInit {
  @Input()
  public atendimentos: Array<Atendimento>;

  constructor() {}

  ngOnInit(): void {}
}

