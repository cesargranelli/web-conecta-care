import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgxMaskDirective, NgxMaskPipe } from 'ngx-mask';

import { Component, EventEmitter, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ContatoPlanoSaude } from 'src/app/features/health-plans/models/contato-plano-saude.model';
import { CadastroPlanosSaudeService } from 'src/app/features/health-plans/services/cadastro-planos-saude.service';
import { ContatoService } from 'src/app/features/health-plans/services/contato.service';
import { Valid } from 'src/app/core/models/Valid';
import { SharedLoadingService } from 'src/app/shared/services/shared-loading.service';
import { SharedValidService } from 'src/app/shared/services/shared-valid.service';
import Swal from 'sweetalert2';
import { FormContatoComponent } from 'src/app/features/health-plans/shared/components/forms/contact/form-contato.component';

@Component({
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, RouterModule, NgxMaskDirective, NgxMaskPipe, FormContatoComponent],
  selector: 'app-informacoes-contato',
  templateUrl: './informacoes-contato.component.html',
  styleUrls: ['./informacoes-contato.component.css']
})
export class InformacoesContatoComponent implements OnInit {

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
    this.isCadastro = false;
    this.linkBotaoVoltar = `planos-saude/${this.valid.id}/dados`;
    this.labelBotaoSubmit = 'Alterar';
  }

  onSubmit(contato: ContatoPlanoSaude) {
    this._loading.emitChange(true);
    contato.idPlanoSaude = this.valid.id;
    this._service.alterar(contato).subscribe(response => {
        setTimeout(() => {
          this._cadastro.contato = contato;
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Alteração realizada com sucesso!',
            showConfirmButton: false,
            timer: 2000
          });
          this._router.navigateByUrl(`planos-saude/${this.valid.id}/dados`);
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
      title: 'Ocorreu um erro inexperado ao tentar inserir endereço',
      showConfirmButton: true
    });
  }

}

