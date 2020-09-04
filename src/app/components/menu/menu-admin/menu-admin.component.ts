import { Component, Inject, OnInit } from '@angular/core';
import { Valid } from 'src/app/services/feat/Valid';
import { AuthInterfaceService } from 'src/app/services/interfaces/auth-interface.service';

declare var jQuery: any;

@Component({
  selector: 'app-menu-admin',
  templateUrl: './menu-admin.component.html',
  styleUrls: ['./menu-admin.component.css']
})
export class MenuAdminComponent implements OnInit {

  public valid: Valid;

  constructor(
    @Inject('AuthInterfaceService') private _authService: AuthInterfaceService
  ) { }

  ngOnInit(): void {
  }

  // admin() {
  //   this._router.navigateByUrl(`admin/${this.valid?.id}/dados-profissionais`);
  // }

  logout() {
    this._authService.logout();
    jQuery('html').removeClass('nav-open');
  }

}
