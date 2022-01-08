import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Modulo } from 'src/app/enums/modulo.enum';
import { Valid } from 'src/app/services/feat/Valid';
import { SharedValidService } from 'src/app/shared/services/shared-valid.service';

declare var jQuery: any;

@Component({
  selector: 'app-menu-homecares',
  templateUrl: './menu-homecares.component.html',
  styleUrls: ['./menu-homecares.component.css']
})
export class MenuHomecaresComponent implements OnInit {

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
    this._router.navigateByUrl(`homecares/${this.valid?.id}/informacoes`);
  }

  logout() {
    this._authService.removeTokens();
    this._validService.removeValid(Modulo.Paciente);
    this._validService.removeValid();
    jQuery('html').removeClass('nav-open');
  }

}
