import {Component, Input, OnChanges, OnDestroy, SimpleChanges} from '@angular/core';
import {AtendimentoService} from '../../../../services/atendimento.service';
import {AtendimentoDetalhes} from '../../../../classes/atendimento-detalhes.class';

declare var jQuery: any;

@Component({
  selector: 'app-modal-detalhe-atendimento',
  templateUrl: './modal-detalhe-atendimento.component.html',
  styleUrls: ['./modal-detalhe-atendimento.component.css']
})
export class ModalDetalheAtendimentoComponent implements OnChanges, OnDestroy {

  @Input() atendimentoId: number;

  public atendimentoDetalhes: AtendimentoDetalhes;

  constructor(
    private service: AtendimentoService
  ) {
  }

  ngOnChanges(simpleChanges: SimpleChanges): void {
    this.atendimentoDetalhes = new AtendimentoDetalhes();
    this.service.consultarDetalhes(this.atendimentoId).subscribe(atendimentoDetalhes => {
      this.atendimentoDetalhes = atendimentoDetalhes;
      console.log(this.atendimentoDetalhes);
    });
  }

  ngOnDestroy() {
    this.atendimentoDetalhes = null;
  }

}
