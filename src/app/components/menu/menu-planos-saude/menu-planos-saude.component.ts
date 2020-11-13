import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Valid } from 'src/app/services/feat/Valid';
import { SharedValidService } from 'src/app/shared/services/shared-valid.service';

declare var jQuery: any;

@Component({
  selector: 'app-menu-planos-saude',
  templateUrl: './menu-planos-saude.component.html',
  styleUrls: ['./menu-planos-saude.component.css']
})
export class MenuPlanosSaudeComponent implements OnInit {

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

  dadosPlanosSaude() {
    this._router.navigateByUrl(`planos-saude/${this.valid?.id}/dados-planos-saude`);
  }

  logout() {
    this._authService.removeTokens();
    jQuery('html').removeClass('nav-open');
  }

}
