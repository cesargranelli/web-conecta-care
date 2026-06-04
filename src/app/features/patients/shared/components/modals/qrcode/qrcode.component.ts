import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgxMaskDirective, NgxMaskPipe } from 'ngx-mask';

import { Component, Input, OnInit } from '@angular/core';
import { AtendimentoProtocolo } from 'src/app/features/patients/models/atendimento-protocolo.model';

@Component({
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, RouterModule, NgxMaskDirective, NgxMaskPipe],
  selector: 'app-qrcode',
  templateUrl: './qrcode.component.html',
  styleUrls: ['./qrcode.component.css']
})
export class QrcodeComponent implements OnInit {

  @Input() atendimentoProtocolo: AtendimentoProtocolo;
  @Input() value: string;

  qrCodeUrl: string = '';

  constructor() { }

  ngOnInit(): void {
    if (this.value) {
      this.qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(this.value)}`;
    }
  }

}

