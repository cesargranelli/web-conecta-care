import { Component, Input, OnChanges, OnDestroy, SimpleChanges } from '@angular/core';
import { AtendimentoService } from '../../../../services/atendimento.service';
import { AtendimentoDetalhes } from '../../../../classes/atendimento-detalhes.class';
import { SharedLoadingService } from 'src/app/shared/services/shared-loading.service';

declare var jQuery: any;

@Component({
  selector: 'app-modal-detalhe-atendimento',
  templateUrl: './modal-detalhe-atendimento.component.html',
  styleUrls: ['./modal-detalhe-atendimento.component.css']
})
export class ModalDetalheAtendimentoComponent implements OnChanges, OnDestroy {

  @Input() atendimentoId: number;

  public atendimentoDetalhes: AtendimentoDetalhes;

  constructor(private service: AtendimentoService, private loading: SharedLoadingService) { }

  ngOnChanges(simpleChanges: SimpleChanges): void {
    this.loading.emitChange(true);

    this.atendimentoDetalhes = new AtendimentoDetalhes();
    if (this.atendimentoId)
      this.service.consultarDetalhes(this.atendimentoId).subscribe(atendimentoDetalhes => {
        setTimeout(() => {
          this.atendimentoDetalhes = atendimentoDetalhes;
          this.loading.emitChange(false);
        });
      });
  }

  ngOnDestroy() {
    this.atendimentoDetalhes = null;
  }

}
