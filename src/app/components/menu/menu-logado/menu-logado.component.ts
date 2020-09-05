import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenService } from 'src/app/services/token.service';
import { SharedEventTokenService } from 'src/app/shared/services/shared-event-token.service';
import { SharedEventValidService } from 'src/app/shared/services/shared-event-valid.service';
import { SharedLoadingService } from 'src/app/shared/services/shared-loading.service';
import { SharedValidService } from 'src/app/shared/services/shared-valid.service';

@Component({
  selector: 'app-menu-logado',
  templateUrl: './menu-logado.component.html',
  styleUrls: ['./menu-logado.component.css']
})
export class MenuLogadoComponent implements OnInit {

  constructor(
    private _router: Router,
    private _validService: SharedValidService,
    private _tokenService: TokenService,
    private _loading: SharedLoadingService,
    private _eventToken: SharedEventTokenService,
    private _eventValid: SharedEventValidService
  ) { }

  ngOnInit(): void {
  }

  logout() {
    this._loading.emitChange(true);
    this._tokenService.removeToken();
    // this._validService.removeValid();
    this._eventToken.emitChange(false);
    this._eventValid.emitChange(false);
    this._router.navigateByUrl(`/`);
    this._loading.emitChange(false);
  }

}
