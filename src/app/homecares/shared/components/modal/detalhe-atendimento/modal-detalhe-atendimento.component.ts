import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {HomeCare} from 'src/app/homecares/classes/homecare.class';
import {FormGroup} from '@angular/forms';
import {AtendimentoService} from '../../../../services/atendimento.service';
import {AtendimentoDetalhes} from '../../../../classes/atendimento-detalhes.class';

declare var jQuery: any;

@Component({
  selector: 'app-modal-detalhe-atendimento',
  templateUrl: './modal-detalhe-atendimento.component.html',
  styleUrls: ['./modal-detalhe-atendimento.component.css']
})
export class ModalDetalheAtendimentoComponent implements OnInit {

  @Input()
  public isCadastro: boolean;

  @Input()
  public linkBotaoVoltar: string;

  @Input()
  public labelBotaoSubmit: string;

  @Output()
  public onSubmitEvent = new EventEmitter<HomeCare>();

  public complementoForm: FormGroup;

  public atendimentoDetalhes: AtendimentoDetalhes;

  constructor(
    private service: AtendimentoService
  ) {
  }

  ngOnInit(): void {
    this.service.consultarDetalhes().subscribe(atendimentoDetalhes => {
      this.atendimentoDetalhes = atendimentoDetalhes;
      console.log(this.atendimentoDetalhes);
    });
  }

}
