import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {TipoSanguineoService} from '../../../../services/tipo-sanguineo.service';
import {TipoSanguineoPaciente} from '../../../../classes/tipo-sanguineo-paciente.class';
import {SharedValidService} from '../../../../../shared/services/shared-valid.service';
import {Valid} from '../../../../../services/feat/Valid';
import {HistoricoMedicoPaciente} from '../../../../classes/historico-medico-paciente.class';
import {SharedLoadingService} from '../../../../../shared/services/shared-loading.service';
import {concatMap, map} from 'rxjs/operators';
import {PacienteService} from '../../../../services/paciente.service';
import {Paciente} from '../../../../classes/paciente.class';
import {HistoricoMedicoService} from '../../../../services/historico-medico.service';

declare var jQuery: any;

@Component({
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

  constructor(private tipoSanguineoService: TipoSanguineoService,
              private validService: SharedValidService,
              private formBuilder: FormBuilder,
              private loading: SharedLoadingService,
              private pacienteService: PacienteService,
              private historicoMedicoService: HistoricoMedicoService,
  ) {
    this.valid = this.validService.getValid();
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
      map(response => this.tiposSanguineo = response.body.data),
      concatMap(() => this.pacienteService.pesquisarPorId(this.validService.getValid().id).pipe(map(paciente => this.paciente = paciente))),
      concatMap(() => this.historicoMedicoService.pesquisarHistoricoMedico(this.paciente.historicoMedico.id))
    ).subscribe(response => {
      this.historicoMedicoPaciente = response.body.data;
      console.log(this.historicoMedicoPaciente);
      this.popularForm();
      jQuery('select').selectpicker('render');
      setTimeout(() => {
        jQuery('select').selectpicker('refresh');
        this.loading.emitChange(false);
      });
    });
    jQuery('.datetimepicker').datetimepicker({
      format: 'DD/MM/YYYY',
      maxDate: new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() - 1)
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
    // this.historicoMedicoPaciente = this.historicoMedicoForm.value;
    console.log(this.historicoMedicoForm.value);
    // this.onSubmitEvent.emit(this.historicoMedicoPaciente);
  }

  public dateChange(control: FormControl, name: string) {
    jQuery(`#${name}`).on('dp.change', function() {
      control.setValue(jQuery('#' + name)[0].value);
    });
  }
}
