import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgxMaskDirective, NgxMaskPipe } from 'ngx-mask';

import { Component, Input, OnChanges, OnDestroy, SimpleChanges } from '@angular/core';
import { AtendimentoGrupo } from 'src/app/features/homecares/models/atendimento-grupo.model';
import { AtendimentoModelo } from 'src/app/features/homecares/models/atendimento-modelo.model';
import { AtendimentoDetalhes } from 'src/app/features/homecares/models/atendimento-detalhes.model';
import { AtendimentoService } from '../../../../services/atendimento.service';

declare var jQuery: any;

import { NgxLoadingModule } from 'ngx-loading';

@Component({
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, RouterModule, NgxMaskDirective, NgxMaskPipe, NgxLoadingModule],
  selector: 'app-modal-detalhe-atendimento',
  templateUrl: './modal-detalhe-atendimento.component.html',
  styleUrls: ['./modal-detalhe-atendimento.component.css']
})
export class ModalDetalheAtendimentoComponent implements OnChanges, OnDestroy {

  @Input() atendimentoId: number;

  atendimentoDetalhes: AtendimentoDetalhes;
  modelos: AtendimentoModelo[];

  showForm: boolean = true;
  loading: boolean = false;

  constructor(private service: AtendimentoService) { }

  ngOnChanges(simpleChanges: SimpleChanges): void {
    this.atendimentoDetalhes = new AtendimentoDetalhes();
    if (this.atendimentoId) {
      this.showForm = true;
      this.loading = true;
      this.service.consultarDetalhes(this.atendimentoId).subscribe(atendimentoDetalhes => {
        setTimeout(() => {
          this.atendimentoDetalhes = atendimentoDetalhes;
          this.modelos = this.getModelos(this.atendimentoDetalhes.grupos);
        });
      }, null, () => {
        this.loading = false;
        this.showForm = false;
      });
    }
  }

  ngOnDestroy() {
    this.atendimentoDetalhes = null;
  }

  getModelos(grupos: AtendimentoGrupo[]): AtendimentoModelo[] {
    let modelosDuplicados = new Array<AtendimentoModelo>();
    let modelo = new AtendimentoModelo();
    // Monta os modelos
    grupos.forEach((grupo: AtendimentoGrupo) => {
      modelo.id = grupo.modelo.id;
      modelo.descricao = grupo.modelo.descricao;
      modelosDuplicados.push(modelo);
    });
    // Reduz os grupos
    let modelos = modelosDuplicados.filter(function (elem, pos, self) {
      return self.indexOf(elem) == pos;
    });
    // Adiciona grupos aos modelos
    modelos.forEach((modelo: AtendimentoModelo) => {
      grupos.forEach((grupo: AtendimentoGrupo) => {
        if (modelo.id == grupo.modelo.id) {
          modelo.grupos.push(grupo);
        }
      });
    });
    return modelos;
  }

}

