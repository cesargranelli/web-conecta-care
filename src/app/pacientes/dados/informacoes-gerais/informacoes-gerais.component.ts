import { Component, EventEmitter, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Valid } from 'src/app/services/feat/Valid';
import { SharedLoadingService } from 'src/app/shared/services/shared-loading.service';
import { SharedValidService } from 'src/app/shared/services/shared-valid.service';
import Swal from 'sweetalert2';
import { Paciente } from '../../classes/paciente.class';
import { PacienteService } from '../../services/paciente.service';

@Component({
  selector: 'app-informacoes-gerais',
  templateUrl: './informacoes-gerais.component.html',
  styleUrls: ['./informacoes-gerais.component.css']
})
export class InformacoesGeraisComponent implements OnInit {

  public router: Router;
  public isCadastro: boolean;
  public linkBotaoVoltar: string;
  public labelBotaoSubmit: string;
  public onSubmitEvent = new EventEmitter<FormGroup>();
  public valid: Valid;

  constructor(
    private pacienteService: PacienteService,
    private validService: SharedValidService,
    private loading: SharedLoadingService) {
    this.valid = this.validService.getValid();
  }

  ngOnInit(): void {
    this.isCadastro = false;
    this.linkBotaoVoltar = '../';
    this.labelBotaoSubmit = 'Alterar';
  }

  onSubmit(paciente: Paciente) {
    this.pacienteService.alterar(paciente).subscribe(paciente => {
      setTimeout(() => {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Alteração realizada com sucesso!',
          showConfirmButton: false,
          timer: 2000
        });
        this.router.navigateByUrl(`homecares/${this.valid.id}/dados`);
        this.loading.emitChange(false);
      });
    },
      () => {
        this.message();
      });
  }

  message() {
    this.loading.emitChange(false);
    Swal.fire({
      position: 'center',
      icon: 'error',
      title: 'Ocorreu um erro inexperado ao tentar atualizar os dados',
      showConfirmButton: true
    });
  }

}
