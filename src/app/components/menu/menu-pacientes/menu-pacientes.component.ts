import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Modulo } from 'src/app/enums/modulo.enum';
import { Valid } from 'src/app/services/feat/Valid';
import { SharedValidService } from 'src/app/shared/services/shared-valid.service';

declare var jQuery: any;

@Component({
  selector: 'app-menu-pacientes',
  templateUrl: './menu-pacientes.component.html',
  styleUrls: ['./menu-pacientes.component.css']
})
export class MenuPacientesComponent implements OnInit {

  public valid: Valid;

  constructor(
    private _router: Router,
    private _authService: AuthService,
    private _validService: SharedValidService
  ) {
    this.valid = this._validService.getValid(Modulo.Paciente);
  }

  ngOnInit(): void {
  }

  dadosPessoais() {
    this._router.navigateByUrl(`pacientes/${this.valid?.id}/dados`);
  }

  logout() {
    this._authService.removeTokens();
    this._validService.removeValid(Modulo.Paciente);
    jQuery('html').removeClass('nav-open');
  }

}
