import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Valid } from 'src/app/services/feat/Valid';
import { SharedValidService } from 'src/app/shared/services/shared-valid.service';

declare var jQuery: any;

@Component({
  selector: 'app-menu-planos-saude-filial',
  templateUrl: './menu-planos-saude-filial.component.html',
  styleUrls: ['./menu-planos-saude-filial.component.css']
})
export class MenuPlanosSaudeFilialComponent implements OnInit {

  public valid: Valid;

  constructor(
    private _router: Router,
    private _authService: AuthService,
    private _validService: SharedValidService
  ) {
    this.valid = this._validService.getValid();
  }

  ngOnInit(): void {
  }

  dadosHomecares() {
    this._router.navigateByUrl(`planos-saude-filial/${this.valid?.id}/dados`);
  }

  logout() {
    this._authService.removeTokens();
    jQuery('html').removeClass('nav-open');
  }

}
