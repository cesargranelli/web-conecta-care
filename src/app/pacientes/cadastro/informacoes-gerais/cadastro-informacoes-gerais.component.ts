import {Component, EventEmitter, OnInit} from '@angular/core';
import {Valid} from "../../../services/feat/Valid";
import {SharedValidService} from "../../../shared/services/shared-valid.service";
import {SharedLoadingService} from "../../../shared/services/shared-loading.service";
import {DocumentoService} from "../../../services/documento.service";
import {Router} from "@angular/router";
import {CadastroHomeCaresService} from "../../../services/cadastro-homecares.service";
import Swal from "sweetalert2";
import {Paciente} from "../../classes/paciente.class";
import {PacienteService} from "../../services/paciente.service";

@Component({
  selector: 'app-informacoes-gerais',
  templateUrl: './cadastro-informacoes-gerais.component.html',
  styleUrls: ['./cadastro-informacoes-gerais.component.css']
})
export class CadastroInformacoesGeraisComponent implements OnInit {

  public isCadastro: boolean;
  public linkBotaoVoltar: string;
  public labelBotaoSubmit: string;
  public dadosLocalStorage: Valid;
  public onSubmitEvent: EventEmitter<Paciente>;

  constructor(
    private _validService: SharedValidService,
    private _loading: SharedLoadingService,
    private _service: PacienteService,
    private _serviceDocumento: DocumentoService,
    private _router: Router,
    private _cadastro: CadastroHomeCaresService
  ) {
    this._loading.emitChange(true);
    this.dadosLocalStorage = this._validService.getValid();
  }

  ngOnInit(): void {
    this.isCadastro = true;
    this.linkBotaoVoltar = null;
    this.labelBotaoSubmit = 'Avançar';
  }

  onSubmit(paciente: Paciente) {
    this._loading.emitChange(true);
    this._service.registrar(paciente).subscribe(novoPaciente => {
      this.dadosLocalStorage.id = novoPaciente.id;
      this._validService.setValid(this.dadosLocalStorage);
      setTimeout(() => {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Alteração realizada com sucesso!',
          showConfirmButton: false,
          timer: 2000
        }).then(() => {
          this._router.navigateByUrl(`pacientes/${this.dadosLocalStorage.id}/cadastro/endereco`);
          this._loading.emitChange(false);
        });
      });
    }, () => {
      this._loading.emitChange(false);
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Ocorreu um erro inexperado ao tentar alterar as informações do profissional',
        showConfirmButton: true
      });
    });
  }

}
