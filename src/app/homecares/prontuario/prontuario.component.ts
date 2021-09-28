import { Component, OnInit } from '@angular/core';
import { Prontuario } from 'src/app/homecares/classes/prontuario.class';
import { TratamentoService } from 'src/app/homecares/services/tratamento.service';
import { Valid } from 'src/app/services/feat/Valid';
import { SharedLoadingService } from 'src/app/shared/services/shared-loading.service';
import { SharedValidService } from 'src/app/shared/services/shared-valid.service';

@Component({
  selector: 'app-prontuario',
  templateUrl: './prontuario.component.html',
  styleUrls: ['./prontuario.component.css'],
})
export class ProntuarioComponent implements OnInit {
  private idPaciente: number;
  private idHomecare: number;
  private dadosLocalStorage: Valid;
  public prontuario: Prontuario;
  public showForm: boolean;

  constructor(
    private tratamentoService: TratamentoService,
    private validService: SharedValidService,
    private loadingService: SharedLoadingService
  ) {
    this.showForm = false;
    this.dadosLocalStorage = this.validService.getValid();
    // this.loadingService.emitChange(true);
  }

  ngOnInit(): void {
    this.idPaciente = this.lerPacienteIdFomUrl();
    this.idHomecare = this.dadosLocalStorage.id;
    this.tratamentoService
      .consultarProntuario(this.idPaciente, this.idHomecare)
      .subscribe((prontuario) => {
        this.prontuario = prontuario;
        this.showForm = true;
        this.loadingService.emitChange(false);
      });
  }

  lerPacienteIdFomUrl(): number {
    const pathNameList = window.location.pathname.split('/');
    return +pathNameList.slice(-1).pop();
  }
}
