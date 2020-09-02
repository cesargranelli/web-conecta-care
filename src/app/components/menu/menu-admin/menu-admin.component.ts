import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/admin/auth/services/auth.service';
import { Valid } from 'src/app/services/feat/Valid';
import { SharedLoadingService } from 'src/app/shared/services/shared-loading.service';

@Component({
  selector: 'app-menu-admin',
  templateUrl: './menu-admin.component.html',
  styleUrls: ['./menu-admin.component.css']
})
export class MenuAdminComponent implements OnInit {

  public valid: Valid;

  constructor(
    private _router: Router,
    private _loading: SharedLoadingService,
    private _authService: AuthService
  ) { }

  ngOnInit(): void {
  }

  // admin() {
  //   this._router.navigateByUrl(`admin/${this.valid?.id}/dados-profissionais`);
  // }

  logout() {
    this._authService.logout();
    this._router.navigateByUrl(`/admin`);
  }

}
