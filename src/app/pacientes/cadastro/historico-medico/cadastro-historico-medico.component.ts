import { Component, EventEmitter, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Modulo } from 'src/app/enums/modulo.enum';
import { Valid } from 'src/app/services/feat/Valid';
import { SharedLoadingService } from 'src/app/shared/services/shared-loading.service';
import { SharedValidService } from 'src/app/shared/services/shared-valid.service';
import Swal from 'sweetalert2';
import { HistoricoMedicoPaciente } from '../../classes/historico-medico-paciente.class';
import { HistoricoMedicoService } from '../../services/historico-medico.service';

@Component({
  selector: 'app-historico-medico',
  templateUrl: './cadastro-historico-medico.component.html',
  styleUrls: ['./cadastro-historico-medico.component.css']
})
export class CadastroHistoricoMedicoComponent implements OnInit {

  public valid: Valid;
  public labelBotaoSubmit: string;
  public linkBotaoVoltar: string;
  public isCadastro = false;
  public onSubmitEvent = new EventEmitter<HistoricoMedicoPaciente>();

  constructor(private validService: SharedValidService,
    private loading: SharedLoadingService,
    private historicoMedicoService: HistoricoMedicoService,
    private router: Router) {
  }

  ngOnInit(): void {
    this.isCadastro = true;
    this.linkBotaoVoltar = `pacientes/${this.valid?.id}/dados`;
    this.labelBotaoSubmit = 'Finalizar';
  }

  onSubmit(historicoMedicoPaciente: HistoricoMedicoPaciente) {
    this.loading.emitChange(true);
    this.historicoMedicoService.cadastrar(historicoMedicoPaciente).subscribe(() => {
      setTimeout(() => {
        this.router.navigateByUrl(`pacientes/${this.validService.getValid(Modulo.Paciente).id}/dados`);
        this.loading.emitChange(false);
      });
    },
      () => {
        this.loading.emitChange(false);
        this.message();
      });
  }

  message() {
    Swal.fire({
      position: 'center',
      icon: 'error',
      title: 'Ocorreu um erro inexperado ao tentar alterar os dados',
      showConfirmButton: true
    });
  }

}
