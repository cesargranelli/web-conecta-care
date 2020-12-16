import {Component, OnInit} from '@angular/core';
import {UsuarioService} from '../../../services/usuario.service';
import {ActivatedRoute, Router} from '@angular/router';
import {SharedLoadingService} from '../../../shared/services/shared-loading.service';
import {FormGroup} from '@angular/forms';
import {Usuario} from '../../../classes/usuario.class';
import {Role} from '../../../enums/role.enum';
import Swal from 'sweetalert2';

declare var jQuery: any;

@Component({
  selector: 'app-login',
  templateUrl: './cadastro-login.component.html',
  styleUrls: ['./cadastro-login.component.css']
})
export class CadastroLoginComponent implements OnInit {

  emailEnviado: boolean = false;
  id: number;
  linkBotaoCancelar: string = '/';
  mostrarflagAceitePrivacidade: boolean = false;

  constructor(
    private _service: UsuarioService,
    private _activatedRoute: ActivatedRoute,
    private _router: Router,
    private _loading: SharedLoadingService
  ) {
    jQuery('html').removeClass('nav-open');
    jQuery('button').removeClass('toggled');

    this.id = Number(this._activatedRoute.snapshot.paramMap.get('id'));
  }

  ngOnInit(): void {
  }

  onSubmit(loginForm: FormGroup) {
    this._loading.emitChange(true);
    let login: Usuario = new Usuario(
      loginForm.value.email,
      loginForm.value.password,
      Role.PlanoSaude,
      this.id
    );

    this._service.cadastrar(login).subscribe(response => {
      setTimeout(() => {
        this.emailEnviado = true;
        this._loading.emitChange(false);
        this.onSuccess(response.body.data.message);
        this._router.navigateByUrl(`espera-confirmacao-email`);
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
