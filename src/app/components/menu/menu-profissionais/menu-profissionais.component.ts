import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from 'src/app/auth/services/auth.service';
import {Valid} from 'src/app/services/feat/Valid';
import {SharedValidService} from 'src/app/shared/services/shared-valid.service';

declare var jQuery: any;

@Component({
  selector: 'app-menu-profissionais',
  templateUrl: './menu-profissionais.component.html',
  styleUrls: ['./menu-profissionais.component.css']
})
export class MenuProfissionaisComponent implements OnInit {

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

  dadosProfissionais() {
    this._router.navigateByUrl(`profissionais/${this.valid?.id}/dados-profissionais`);
  }

  logout() {
    this._authService.removeTokens();
    this._validService.removeValid();
    jQuery('html').removeClass('nav-open');
  }

}
