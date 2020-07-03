import { Token } from '@angular/compiler/src/ml_parser/lexer';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ngxLoadingAnimationTypes } from 'ngx-loading';
import { CadastroService } from 'src/app/services/cadastro.service';
import { Valid } from 'src/app/services/feat/Valid';

@Component({
  selector: 'app-confirmacao-cadastro',
  templateUrl: './confirmacao-cadastro.component.html',
  styleUrls: ['./confirmacao-cadastro.component.css']
})
export class ConfirmacaoCadastroComponent implements OnInit {

  public ngxLoadingAnimationTypes = ngxLoadingAnimationTypes;

  public loading = true;
  public loadingTemplate: TemplateRef<any>;
  public token: Token;
  public valid: Valid;

  constructor(
    private activateRoute: ActivatedRoute,
    private router: Router,
    private cadastroService: CadastroService
  ) { }

  ngOnInit(): void {
    this.activateRoute.params.subscribe(value => {
      this.token = value.token;
      this.cadastroService.validar(this.token).subscribe(response => {
        this.valid = response.body;
        setTimeout(() => {
          if (this.valid != null) {
            console.log(`Perfil do usuário: ${this.valid.role}`);
            this.router.navigateByUrl(`cadastro/profissionais/${this.valid.id}/informacoes-gerais`, {
              state: { valid: this.valid }
            });
          }
          this.loading = false;
        });
      },
      error => {
        this.loading = false;
        this.router.navigateByUrl(`/`);
      });
    });
  }

}
