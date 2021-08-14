import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { SharedLoadingService } from '../shared/services/shared-loading.service';
import { SharedValidService } from '../shared/services/shared-valid.service';
import { AtendimentoProtocolo } from './classes/atendimento-protocolo.class';
import { AtendimentoService } from './services/atendimento.service';

@Component({
  selector: 'app-pacientes',
  templateUrl: './pacientes.component.html',
  styleUrls: ['./pacientes.component.css']
})
export class PacientesComponent implements OnInit {

  atendimentosProtocolo: AtendimentoProtocolo[];

  constructor(
    private _validService: SharedValidService,
    private _loading: SharedLoadingService,
    private _atendimentoService: AtendimentoService
    ) {
      this._loading.emitChange(true);
    }

  ngOnInit(): void {
    this._atendimentoService.atendimentosProtocolo(String(this._validService.getValid().id), this.dataAtualFormatada())
      .subscribe(response => {
        this.atendimentosProtocolo = response.body.data;
        this._loading.emitChange(false);
    }, (errorResponse: HttpErrorResponse) => {
      if (errorResponse.status === 0) {
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'Sistema indisponível! ' + errorResponse.statusText,
          showConfirmButton: true
        });
      }
      this._loading.emitChange(false);
    });
  }

  dataAtualFormatada() {
    var data = new Date(),
        dia  = data.getDate().toString().padStart(2, '0'),
        mes  = (data.getMonth()+1).toString().padStart(2, '0'),
        ano  = data.getFullYear();
    return dia+"/"+mes+"/"+ano;
  }

}
