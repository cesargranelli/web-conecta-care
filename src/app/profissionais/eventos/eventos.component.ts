import { Component, OnInit } from '@angular/core';
import { Valid } from 'src/app/services/feat/Valid';
import { SharedLoadingService } from 'src/app/shared/services/shared-loading.service';
import { SharedValidService } from 'src/app/shared/services/shared-valid.service';
import Swal from 'sweetalert2';
import { ProfissionalService } from '../services/profissional.service';

@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.component.html',
  styleUrls: ['./eventos.component.css'],
})
export class EventosComponent implements OnInit {
  eventos: any;

  private valid: Valid;

  constructor(
    private _service: ProfissionalService,
    private _validService: SharedValidService,
    private _loading: SharedLoadingService
  ) {
    this.valid = this._validService.getValid();
  }

  ngOnInit(): void {
    this._loading.emitChange(true);
    this._service.eventos(this.valid.id).subscribe(
      (response) => {
        this.eventos = response.body.data;
      },
      () => {
        this._loading.emitChange(false);
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'Não há eventos para o profissional',
          showConfirmButton: true,
        });
      }
    );
    this._loading.emitChange(false);
  }
}
