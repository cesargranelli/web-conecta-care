import { Component, EventEmitter, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ContatoPlanoSaude } from 'src/app/planos-saude/classes/contato-plano-saude.class';
import { CadastroPlanosSaudeService } from 'src/app/planos-saude/services/cadastro-planos-saude.service';
import { ContatoService } from 'src/app/planos-saude/services/contato.service';
import { Valid } from 'src/app/services/feat/Valid';
import { SharedLoadingService } from 'src/app/shared/services/shared-loading.service';
import { SharedValidService } from 'src/app/shared/services/shared-valid.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cadastro-contato-plano-saude',
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
    contato.proprietarioId = this.valid.id;
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
