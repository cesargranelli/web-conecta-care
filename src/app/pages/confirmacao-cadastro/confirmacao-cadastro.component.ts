import { Component, OnInit, TemplateRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ngxLoadingAnimationTypes } from 'ngx-loading';
import { CadastroService } from 'src/app/services/cadastro.service';
import { Authorization } from 'src/app/services/feat/token';
import { Valid } from 'src/app/services/feat/Valid';
import Swal from 'sweetalert2';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-confirmacao-cadastro',
  templateUrl: './confirmacao-cadastro.component.html',
  styleUrls: ['./confirmacao-cadastro.component.css']
})
export class ConfirmacaoCadastroComponent implements OnInit {

  public ngxLoadingAnimationTypes = ngxLoadingAnimationTypes;

  public loading = true;
  public loadingTemplate: TemplateRef<any>;
  public authorization: Authorization = new Authorization();
  public valid: Valid;

  constructor(
    private _activateRoute: ActivatedRoute,
    private _tokenService: TokenService,
    private _router: Router,
    private _cadastroService: CadastroService
  ) { }

  ngOnInit(): void {
    this._activateRoute.params.subscribe(value => {
      this.authorization.token = value.token;
      this._tokenService.setToken(value.token);
      this._cadastroService.validar(this.authorization).subscribe(response => {
        this.valid = response.body.data;
        setTimeout(() => {
          if (this.valid != null) {
            console.log(`Perfil do usuário: ${this.valid.role}`);
            this._router.navigateByUrl(`cadastro/profissionais/${this.valid.id}/informacoes-gerais`, {
              state: { valid: this.valid }
            });
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
