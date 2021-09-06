import {Component, OnInit, TemplateRef} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ngxLoadingAnimationTypes} from 'ngx-loading';
import {Role} from 'src/app/enums/role.enum';
import {CadastroService} from 'src/app/services/cadastro.service';
import {Authorization} from 'src/app/services/feat/token';
import {Valid} from 'src/app/services/feat/Valid';
import {SharedTokenService} from 'src/app/shared/services/shared-token.service';
import {SharedValidService} from 'src/app/shared/services/shared-valid.service';
import Swal from 'sweetalert2';
import { Modulo } from 'src/app/classes/modulo';

@Component({
  selector: 'app-confirmacao-cadastro',
  templateUrl: './confirmacao-cadastro.component.html',
  styleUrls: ['./confirmacao-cadastro.component.css']
})
export class ConfirmacaoCadastroComponent implements OnInit {

  ngxLoadingAnimationTypes = ngxLoadingAnimationTypes;

  loading = true;
  loadingTemplate: TemplateRef<any>;
  authorization: Authorization = new Authorization();

  constructor(
    private _router: Router,
    private _activateRoute: ActivatedRoute,
    private _validService: SharedValidService,
    private _tokenService: SharedTokenService,
    private _cadastroService: CadastroService
  ) {
  }

  ngOnInit(): void {
    this._activateRoute.params.subscribe(value => {
      this.authorization.token = value.token;
      this._tokenService.setToken(value.token);
      this._cadastroService.validar(this.authorization).subscribe(response => {
          let valid: Valid = response.body.data;
          this._validService.setValid(valid);
          setTimeout(() => {
            if (valid != null) {
              console.log(`Perfil do usuário: ${valid.role}`);
              switch (valid.role) {
                case Role.Profissional:
                  this._router.navigateByUrl(`cadastro/profissionais/${valid.id}/informacoes-gerais`);
                  break;
                case Role.Homecare:
                  this._router.navigateByUrl(`homecares/${valid.id}/cadastro/homecare`);
                  break;
                case Role.PlanoSaude:
                  this._router.navigateByUrl(`planos-saude/${valid.id}/cadastro/plano-saude`);
                  break;
                case Role.Paciente:
                  this._router.navigateByUrl(`pacientes/${valid.id}/cadastro/informacoes-gerais`);
                  break;
                default:
                  this._router.navigateByUrl(`/`);
              }
            }
            this.loading = false;
          });
        },
        () => {
          this.loading = false;
          Swal.fire({
            position: 'center',
            icon: 'warning',
            title: 'Não foi possível realizar o acesso ao cadastro',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true
          });
          this._router.navigateByUrl(`/`);
        });
    });
  }

}
