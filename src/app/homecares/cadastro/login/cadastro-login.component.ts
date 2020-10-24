import {Component, OnInit} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {Usuario} from 'src/app/classes/usuario.class';
import {Role} from 'src/app/enums/role.enum';
import {UsuarioService} from 'src/app/services/usuario.service';
import {SharedLoadingService} from 'src/app/shared/services/shared-loading.service';
import Swal from 'sweetalert2';

declare var jQuery: any;

@Component({
  selector: 'app-cadastro-login-homecare',
  templateUrl: './cadastro-login.component.html',
  styleUrls: ['./cadastro-login.component.css']
})
export class CadastroLoginComponent implements OnInit {

  emailEnviado: boolean = false;
  id: number;
  linkBotaoCancelar: string = '/';

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
      Role.Homecare,
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
