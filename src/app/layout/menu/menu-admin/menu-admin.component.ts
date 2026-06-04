import {Component, OnInit} from '@angular/core';
import {AuthAdminService} from 'src/app/features/auth/services/auth-admin.service';
import {Valid} from 'src/app/core/models/Valid';

declare var jQuery: any;

@Component({
  standalone: false,
  selector: 'app-menu-admin',
  templateUrl: './menu-admin.component.html',
  styleUrls: ['./menu-admin.component.css']
})
export class MenuAdminComponent implements OnInit {

  public valid: Valid;

  constructor(
    private _authService: AuthAdminService
  ) {
  }

  ngOnInit(): void {
  }

  // admin() {
  //   this._router.navigateByUrl(`admin/${this.valid?.id}/profile`);
  // }

  logout() {
    this._authService.removeTokens();
    jQuery('html').removeClass('nav-open');
  }

}
