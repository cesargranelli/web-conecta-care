import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Authorization } from 'src/app/services/feat/token';
import { LoginService } from 'src/app/services/login.service';
import { ValidaToken } from 'src/app/services/response/valida-token';
import { SharedLoadingService } from 'src/app/shared/services/shared-loading.service';
import { SharedTokenService } from 'src/app/shared/services/shared-token.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-confirmacao-nova-senha',
  templateUrl: './confirmacao-nova-senha.component.html',
  styleUrls: ['./confirmacao-nova-senha.component.css']
})
export class ConfirmacaoNovaSenhaComponent implements OnInit {

  @Output() loadingEvent = new EventEmitter<boolean>();
  public authorization: Authorization = new Authorization();
  public validaToken: ValidaToken;

  constructor(
    private _router: Router,
    private _activateRoute: ActivatedRoute,
    private _loading: SharedLoadingService,
    private _tokenService: SharedTokenService,
    private _service: LoginService
  ) {
  }

  ngOnInit(): void {
    setTimeout(() => {
      this._loading.emitChange(true);

      this._activateRoute.params.subscribe(value => {
        this.authorization.token = value.token;
        this._tokenService.setToken(value.token);
        this._service.validaToken(this.authorization).subscribe(response => {
            this.validaToken = response.body;
            if (this.validaToken?.id != undefined) {
              console.log(`Perfil do usuário: ${this.validaToken.role}`);
              this._loading.emitChange(false);
              this._router.navigateByUrl(`login/nova-senha/${this.validaToken.id}`, {
                state: {valid: this.validaToken}
              });
            } else {
              this._loading.emitChange(false);
              Swal.fire({
                position: 'center',
                icon: 'warning',
                title: response.body.message,
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true
              }).then(() => this._router.navigateByUrl(`login`));
            }
          },
          () => {
            this._loading.emitChange(false);
            Swal.fire({
              position: 'center',
              icon: 'warning',
              title: 'Não foi possível realizar o acesso ao cadastro da nova senha',
              showConfirmButton: false,
              timer: 3000,
              timerProgressBar: true
            }).then(() => this._router.navigateByUrl(`login`));
          });
      });
    });
  }
}
