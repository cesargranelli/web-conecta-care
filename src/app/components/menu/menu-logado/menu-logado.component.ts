import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthAdminService } from 'src/app/auth/services/auth-admin.service';

@Component({
  selector: 'app-menu-logado',
  templateUrl: './menu-logado.component.html',
  styleUrls: ['./menu-logado.component.css']
})
export class MenuLogadoComponent implements OnInit {

  constructor(
    private _router: Router,
    private _authService: AuthAdminService
  ) { }

  ngOnInit(): void {
  }

  logout() {
    this._authService.removeTokens();
    this._router.navigateByUrl(`/`);
  }

}
