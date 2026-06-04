import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgxMaskDirective, NgxMaskPipe } from 'ngx-mask';
import { Component, OnInit } from '@angular/core';
import { Prontuario } from 'src/app/features/homecares/models/prontuario.model';
import { TratamentoService } from 'src/app/features/homecares/services/tratamento.service';
import { Valid } from 'src/app/core/models/Valid';
import { SharedLoadingService } from 'src/app/shared/services/shared-loading.service';
import { SharedValidService } from 'src/app/shared/services/shared-valid.service';

@Component({
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, RouterModule, NgxMaskDirective, NgxMaskPipe],
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
