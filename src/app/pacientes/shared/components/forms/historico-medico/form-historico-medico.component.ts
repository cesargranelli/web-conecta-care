import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {TipoSanguineoService} from '../../../../services/tipo-sanguineo.service';
import {TipoSanguineoPaciente} from '../../../../classes/tipo-sanguineo-paciente.class';
import {SharedValidService} from '../../../../../shared/services/shared-valid.service';
import {Valid} from '../../../../../services/feat/Valid';
import {HistoricoMedicoPaciente} from '../../../../classes/historico-medico-paciente.class';
import {Paciente} from '../../../../classes/paciente.class';
import {SharedLoadingService} from '../../../../../shared/services/shared-loading.service';

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
  public onSubmitEvent: EventEmitter<Paciente>;

  public valid: Valid;
  public historicoMedico: FormGroup;
  public hiddenForm: boolean;
  public historicoMedicoPaciente: HistoricoMedicoPaciente;
  public tiposSanguineo: Array<TipoSanguineoPaciente>;

  constructor(private tipoSanguineoService: TipoSanguineoService,
              private validService: SharedValidService,
              private formBuilder: FormBuilder,
              private loading: SharedLoadingService,
  ) {
    this.valid = this.validService.getValid();

    this.historicoMedico = this.formBuilder.group({
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
    this.historicoMedicoPaciente = new HistoricoMedicoPaciente();

    this.tipoSanguineoService.listarTipoSanguineo().subscribe(response => {
      this.tiposSanguineo = response.body.data;
      jQuery('select').selectpicker('render');
      setTimeout(() => {
        jQuery('select').selectpicker('refresh');
        this.loading.emitChange(false);
      });
    });

  }

  onSubmit() {
    console.log(this.historicoMedico.value);
  }

  public dateChange(control: FormControl, name: string) {
    jQuery(`#${name}`).on('dp.change', function() {
      control.setValue(jQuery('#' + name)[0].value);
    });
  }
}
