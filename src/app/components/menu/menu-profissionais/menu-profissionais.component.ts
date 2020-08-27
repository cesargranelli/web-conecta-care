import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenService } from 'src/app/services/token.service';
import { SharedEventTokenService } from 'src/app/shared/services/shared-event-token.service';
import { SharedEventValidService } from 'src/app/shared/services/shared-event-valid.service';
import { SharedLoadingService } from 'src/app/shared/services/shared-loading.service';
import { ValidService } from 'src/app/shared/services/shared-valid.service';
import { Valid } from 'src/app/services/feat/Valid';

@Component({
  selector: 'app-menu-profissionais',
  templateUrl: './menu-profissionais.component.html',
  styleUrls: ['./menu-profissionais.component.css']
})
export class MenuProfissionaisComponent implements OnInit {

  public valid: Valid;

  constructor(
    private _router: Router,
    private _validService: ValidService,
    private _tokenService: TokenService,
    private _loading: SharedLoadingService,
    private _eventToken: SharedEventTokenService,
    private _eventValid: SharedEventValidService
  ) {
    this.valid = this._validService.getValid();
  }

  ngOnInit(): void {
  }

  dadosProfissionais() {
    this._router.navigateByUrl(`profissionais/${this.valid?.id}/dados-profissionais`);
  }

  logout() {
    this._loading.emitChange(true);
    this._tokenService.removeToken();
    this._validService.removeValid();
    this._eventToken.emitChange(false);
    this._eventValid.emitChange(false);
    this._router.navigateByUrl(`/`);
    this._loading.emitChange(false);
  }

}
