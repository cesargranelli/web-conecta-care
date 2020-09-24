import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';
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
    this._router.navigateByUrl(`homecares/${this.valid?.id}/dados-homecares`);
  }

  logout() {
    this._authService.removeTokens();
    jQuery('html').removeClass('nav-open');
  }

}
