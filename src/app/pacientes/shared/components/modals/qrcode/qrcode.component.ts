import { Component, Input, OnInit } from '@angular/core';
import { NgxQrcodeElementTypes, NgxQrcodeErrorCorrectionLevels } from '@techiediaries/ngx-qrcode';
import { AtendimentoProtocolo } from 'src/app/pacientes/classes/atendimento-protocolo.class';

@Component({
  selector: 'app-qrcode',
  templateUrl: './qrcode.component.html',
  styleUrls: ['./qrcode.component.css']
})
export class QrcodeComponent implements OnInit {

  @Input() atendimentoProtocolo: AtendimentoProtocolo;
  @Input() value: string;

  elementType = NgxQrcodeElementTypes.IMG;
  correctionLevel = NgxQrcodeErrorCorrectionLevels.HIGH;

  constructor() { }

  ngOnInit(): void {
  }

}
