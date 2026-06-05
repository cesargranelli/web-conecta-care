import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgxMaskDirective, NgxMaskPipe } from 'ngx-mask';

import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { concatMap, map } from 'rxjs/operators';
import { Modulo } from 'src/app/core/enums/modulo.enum';
import { Role } from 'src/app/core/enums/role.enum';
import { Valid } from 'src/app/core/models/Valid';
import { SharedLoadingService } from 'src/app/shared/services/shared-loading.service';
import { SharedValidService } from 'src/app/shared/services/shared-valid.service';
import { HistoricoMedicoPaciente } from 'src/app/features/patients/models/historico-medico-paciente.model';
import { Paciente } from 'src/app/features/patients/models/paciente.model';
import { TipoSanguineoPaciente } from 'src/app/features/patients/models/tipo-sanguineo-paciente.model';
import { HistoricoMedicoService } from '../../../../services/historico-medico.service';
import { PacienteService } from '../../../../services/paciente.service';
import { TipoSanguineoService } from '../../../../services/tipo-sanguineo.service';

declare var jQuery: any;

@Component({
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, RouterModule, NgxMaskDirective, NgxMaskPipe],
  selector: 'app-form-historico-medico',
  templateUrl: './form-historico-medico.component.html',
  styleUrls: ['./form-historico-medico.component.css']
})
export class FormHistoricoMedicoComponent implements OnInit {

  @Input()
  public isCadastro: boolean;
  @Input()
  public linkBotaoVoltar: string;
  @Input()
  public labelBotaoSubmit: string;
  @Output()
  public onSubmitEvent: EventEmitter<HistoricoMedicoPaciente>;

  public valid: Valid;
  public historicoMedicoForm: FormGroup;
  public hiddenForm: boolean;
  public historicoMedicoPaciente: HistoricoMedicoPaciente;
  public tiposSanguineo: Array<TipoSanguineoPaciente>;
  public paciente: Paciente;

  pacienteId: number;
  campoHabilitado: boolean;

  constructor(private tipoSanguineoService: TipoSanguineoService,
    private validService: SharedValidService,
    private formBuilder: FormBuilder,
    private loading: SharedLoadingService,
    private pacienteService: PacienteService,
    private historicoMedicoService: HistoricoMedicoService,
    private route: ActivatedRoute
  ) {
    this.loading.emitChange(true);
    this.hiddenForm = true;
    this.pacienteId = this.route.snapshot.params.paciente_id;
    this.campoHabilitado = this.validService.getValid(Modulo.Paciente)?.role == Role.Paciente ? true : false;
    this.onSubmitEvent = new EventEmitter<HistoricoMedicoPaciente>();

    this.historicoMedicoForm = this.formBuilder.group({
      carteiraVacinacao: null,
      alergiaMedicamento: null,
      alergiaMedicamentoDescricao: null,
      dataUltimoTratamento: null,
      dataUltimoAtendimento: null,
      tipoSanguineo: null,
      flagAceiteDeclaracao: null,
    });
  }

  ngOnInit(): void {
    this.tipoSanguineoService.listarTipoSanguineo().pipe(
      map(response => this.tiposSanguineo = response.body),
      concatMap(() => this.pacienteService.pesquisarPorId(this.pacienteId)))
      .subscribe(response => {
        this.paciente = response;
        if (this.paciente.historicoMedico) {
          this.historicoMedicoService.pesquisarHistoricoMedico(this.paciente.historicoMedico.id).subscribe(response => {
            this.historicoMedicoPaciente = response;
          });
        }
        this.popularForm();
        jQuery('select').selectpicker('render');
        setTimeout(() => {
          jQuery('select').selectpicker('refresh');
          // this.historicoMedicoForm.disable({ onlySelf: !this.campoHabilitado });
          this.hiddenForm = false;
          this.loading.emitChange(false);
        });
      });
    jQuery('.datetimepicker').datetimepicker({
      locale: 'pt-BR',
      format: 'L',
      icons: {
        time: "fa fa-clock-o",
        date: "fa fa-calendar",
        up: "fa fa-chevron-up",
        down: "fa fa-chevron-down",
        previous: 'fa fa-chevron-left',
        next: 'fa fa-chevron-right',
        today: 'fa fa-screenshot',
        clear: 'fa fa-trash',
        close: 'fa fa-remove'
      }
    });
  }

  popularForm(): void {
    if (this.historicoMedicoPaciente) {
      this.historicoMedicoForm.patchValue({
        carteiraVacinacao: this.historicoMedicoPaciente.carteiraVacinacao,
        alergiaMedicamento: this.historicoMedicoPaciente.alergiaMedicamento,
        alergiaMedicamentoDescricao: this.historicoMedicoPaciente.alergiaMedicamentoDescricao,
        dataUltimoTratamento: this.historicoMedicoPaciente.dataUltimoTratamento,
        dataUltimoAtendimento: this.historicoMedicoPaciente.dataUltimoAtendimento,
        tipoSanguineo: this.historicoMedicoPaciente.tipoSanguineo,
        flagAceiteDeclaracao: this.historicoMedicoPaciente.flagAceiteDeclaracao,
      });
    }
  }

  onSubmit() {
    this.historicoMedicoPaciente = this.historicoMedicoForm.value;
    this.historicoMedicoPaciente.tipoSanguineo = this.tiposSanguineo.find(tipoSanguineo => tipoSanguineo.id === this.historicoMedicoForm.value.tipoSanguineo);
    this.onSubmitEvent.emit(this.historicoMedicoPaciente);
  }

  public dateChange(control: FormControl, name: string) {
    jQuery(`#${name}`).on('dp.change', function () {
      control.setValue(jQuery('#' + name)[0].value);
    });
  }
}

