import {Component, EventEmitter, OnInit} from '@angular/core';
import {Valid} from '../../../services/feat/Valid';
import {FormGroup} from '@angular/forms';
import {SharedValidService} from '../../../shared/services/shared-valid.service';
import {SharedLoadingService} from '../../../shared/services/shared-loading.service';
import {Router} from '@angular/router';
import Swal from 'sweetalert2';
import {ContatoService} from '../../services/contato.service';
import {ContatoPaciente} from '../../classes/contato-paciente.class';

@Component({
  selector: 'app-contato',
  templateUrl: './cadastro-contato.component.html',
  styleUrls: ['./cadastro-contato.component.css']
})
export class CadastroContatoComponent implements OnInit {

  public valid: Valid;
  public isCadastro: boolean;
  public linkBotaoVoltar: string;
  public labelBotaoSubmit: string;
  public onSubmitEvent = new EventEmitter<FormGroup>();
  public contatoFormGroup: FormGroup;
  public hideForm = true;

  constructor(
    private _validService: SharedValidService,
    private _loading: SharedLoadingService,
    private _service: ContatoService,
    private _router: Router
  ) {
    this._loading.emitChange(true);
    this.valid = this._validService.getValid();
  }

  ngOnInit(): void {
    this.isCadastro = true;
    this.linkBotaoVoltar = `pacientes/${this.valid?.id}/cadastro/endereco`;
    this.labelBotaoSubmit = 'Finalizar';
  }

  onSubmit(contato: ContatoPaciente) {
    this._loading.emitChange(true);
    this._service.cadastrar(contato).subscribe(() => {
        setTimeout(() => {
          this._router.navigateByUrl(`pacientes/${this.valid.id}`);
          this._loading.emitChange(false);
        });
      },
      () => {
        this._loading.emitChange(false);
        this.message();
      });
  }

  message() {
    Swal.fire({
      position: 'center',
      icon: 'error',
      title: 'Ocorreu um erro inexperado ao tentar alterar os dados de contato',
      showConfirmButton: true
    });
  }

}
