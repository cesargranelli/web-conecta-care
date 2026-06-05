import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgxMaskDirective, NgxMaskPipe } from 'ngx-mask';

import { Component, EventEmitter, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ContatoPlanoSaudeFilial } from 'src/app/features/health-plan-branches/models/contato-plano-saude-filial.model';
import { CadastroPlanosSaudeFilialService } from 'src/app/features/health-plan-branches/services/cadastro-planos-saude-filial.service';
import { ContatoService } from 'src/app/features/health-plan-branches/services/contato.service';
import { Valid } from 'src/app/core/models/Valid';
import { SharedLoadingService } from 'src/app/shared/services/shared-loading.service';
import { SharedValidService } from 'src/app/shared/services/shared-valid.service';
import Swal from 'sweetalert2';
import { FormContatoComponent as FormContatoFilialComponent } from 'src/app/features/health-plan-branches/shared/components/forms/contact/form-contato.component';

@Component({
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, RouterModule, NgxMaskDirective, NgxMaskPipe, FormContatoFilialComponent],
  selector: 'app-cadastro-contato-plano-saude-filial',
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
    private _cadastro: CadastroPlanosSaudeFilialService
  ) {
    this._loading.emitChange(true);
    this.valid = this._validService.getValid();
  }

  ngOnInit(): void {
    this.isCadastro = true;
    this.linkBotaoVoltar = `planos-saude/${this.valid?.id}/register/filial/endereco`;
    this.labelBotaoSubmit = 'Avançar';
  }

  onSubmit(contato: ContatoPlanoSaudeFilial) {
    this._loading.emitChange(true);
    contato.idPlanoSaude = this._cadastro.planoSaude.id;
    contato.flagAceitePrivacidade = true;
    if (!this._cadastro.contato.id) {
      this._service.cadastrar(contato).subscribe(response => {
        setTimeout(() => {
          this._cadastro.contato = contato;
          this._router.navigateByUrl(`planos-saude/${this.valid.id}/register/filial/login`);
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
          this._router.navigateByUrl(`planos-saude/${this.valid.id}/register/filial/login`);
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
      title: 'Ocorreu um erro inexperado ao tentar inserir contatos',
      showConfirmButton: true
    });
  }

}

