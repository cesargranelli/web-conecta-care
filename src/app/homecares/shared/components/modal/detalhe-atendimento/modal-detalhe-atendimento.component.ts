import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { HomeCare } from 'src/app/homecares/classes/homecare.class';

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

  constructor() {
  }

  ngOnInit(): void {
  }

}
