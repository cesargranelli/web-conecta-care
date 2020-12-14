import {Component, EventEmitter, OnInit} from '@angular/core';
import {Valid} from '../../../services/feat/Valid';
import {FormGroup} from '@angular/forms';
import {SharedValidService} from '../../../shared/services/shared-valid.service';
import {SharedLoadingService} from '../../../shared/services/shared-loading.service';
import {ContatoService} from '../../../planos-saude/services/contato.service';
import {Router} from '@angular/router';
import {CadastroPlanosSaudeService} from '../../../planos-saude/services/cadastro-planos-saude.service';
import {ContatoPlanoSaude} from '../../../planos-saude/classes/contato-plano-saude.class';
import Swal from "sweetalert2";

@Component({
  selector: 'app-contato',
  templateUrl: './contato.component.html',
  styleUrls: ['./contato.component.css']
})
export class ContatoComponent implements OnInit {

  public valid: Valid;
  public isCadastro: boolean;
  public linkBotaoVoltar: string;
  public labelBotaoSubmit: string;
  public onSubmitEvent = new EventEmitter<FormGroup>();

  public contatoFormGroup: FormGroup;
  public hideForm: boolean = true;

  constructor(
    private _validService: SharedValidService,
    private _loading: SharedLoadingService,
    private _service: ContatoService,
    private _router: Router,
    private _cadastro: CadastroPlanosSaudeService
  ) {
    this._loading.emitChange(true);
    this.valid = this._validService.getValid();
  }

  ngOnInit(): void {
    this.isCadastro = true;
    this.linkBotaoVoltar = `planos-saude/${this.valid.id}/cadastro/endereco`;
    this.labelBotaoSubmit = 'Finalizar';
  }

  onSubmit(contato: ContatoPlanoSaude) {
    this._loading.emitChange(true);
    contato.idPlanoSaude = this.valid.id;
    contato.flagAceitePrivacidade = true;
    if (!this._cadastro.contato.id) {
      this._service.cadastrar(contato).subscribe(response => {
          setTimeout(() => {
            this._cadastro.contato = contato;
            this._router.navigateByUrl(`planos-saude/${this.valid.id}`);
            this._loading.emitChange(false);
          });
        },
        () => {
          this._loading.emitChange(false);
          this.message();
        });
    } else {
      this._service.alterar(contato).subscribe(response => {
          setTimeout(() => {
            this._cadastro.contato = contato;
            this._router.navigateByUrl(`planos-saude/${this.valid.id}`);
            this._loading.emitChange(false);
          });
        },
        () => {
          this._loading.emitChange(false);
          this.message();
        });
    }
  }

  message() {
    Swal.fire({
      position: 'center',
      icon: 'error',
      title: 'Ocorreu um erro inexperado ao tentar inserir endereço',
      showConfirmButton: true
    });
  }

}
