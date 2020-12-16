import { Component, EventEmitter, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Usuario } from 'src/app/classes/usuario.class';
import { Role } from 'src/app/enums/role.enum';
import { UsuarioService } from 'src/app/services/usuario.service';
import { SharedLoadingService } from 'src/app/shared/services/shared-loading.service';
import Swal from 'sweetalert2';
import { PlanoSaudeFilial } from '../../classes/plano-saude-filial.class';
import { SharedValidService } from 'src/app/shared/services/shared-valid.service';
import { CadastroPlanosSaudeFilialService } from '../../services/cadastro-planos-saude-filial.service';
import { Valid } from 'src/app/services/feat/Valid';

declare var jQuery: any;

@Component({
  selector: 'app-cadastro-login-plano-saude-filial',
  templateUrl: './cadastro-login.component.html',
  styleUrls: ['./cadastro-login.component.css']
})
export class CadastroLoginComponent implements OnInit {

  valid: Valid;
  emailEnviado: boolean = false;
  id: number;
  isCadastro: boolean;
  linkBotaoVoltar: string;
  labelBotaoSubmit: string;
  onSubmitEvent = new EventEmitter<FormGroup>();

  constructor(
    private _validService: SharedValidService,
    private _service: UsuarioService,
    private _activatedRoute: ActivatedRoute,
    private _router: Router,
    private _loading: SharedLoadingService,
    private _cadastro: CadastroPlanosSaudeFilialService
  ) {
    jQuery('html').removeClass('nav-open');
    jQuery('button').removeClass('toggled');

    this.valid = this._validService.getValid();
    this.id = Number(this._activatedRoute.snapshot.paramMap.get('id'));
  }

  ngOnInit(): void {
    this.isCadastro = true;
    this.linkBotaoVoltar = `planos-saude/${this.id}/cadastro/filial/contato`;
    this.labelBotaoSubmit = "Avançar";
  }

  onSubmit(loginForm: FormGroup) {
    this._loading.emitChange(true);
    let login: Usuario = new Usuario(
      loginForm.value.email,
      loginForm.value.password,
      Role.PlanoSaudeFilial,
      this._cadastro.planoSaude.id
    );

    this._service.cadastrar(login).subscribe(response => {
      setTimeout(() => {
        this._router.navigateByUrl(`planos-saude/${this.id}`);
      this._loading.emitChange(false);
      });
    }, httpResponse => {
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: httpResponse.error.data.message,
        showConfirmButton: true
      });
      this._loading.emitChange(false);
    });
  }

  onSuccess(message: string) {
    Swal.fire({
      position: 'center',
      icon: 'success',
      text: message,
      showConfirmButton: true
    });
  }
}
