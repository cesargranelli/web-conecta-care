import { Component, Input, OnChanges, OnDestroy, SimpleChanges } from '@angular/core';
import { AtendimentoGrupo } from 'src/app/homecares/classes/atendimento-grupo.class';
import { AtendimentoModelo } from 'src/app/homecares/classes/atendimento-modelo.class';
import { AtendimentoDetalhes } from '../../../../classes/atendimento-detalhes.class';
import { AtendimentoService } from '../../../../services/atendimento.service';

declare var jQuery: any;

@Component({
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
