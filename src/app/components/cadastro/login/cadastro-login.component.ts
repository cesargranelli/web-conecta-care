import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { OK } from 'http-status-codes';
import { Usuario } from 'src/app/classes/usuario.class';
import { Role } from 'src/app/enums/role.enum';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';
import { SharedLoadingService } from 'src/app/shared/services/shared-loading.service';

@Component({
  selector: 'app-cadastro-login',
  templateUrl: './cadastro-login.component.html',
  styleUrls: ['./cadastro-login.component.css']
})
export class CadastroLoginComponent implements OnInit {

  @Output() loadingEvent = new EventEmitter<boolean>();
  public loginForm: FormGroup;
  public captcha: boolean = false;
  public emailEnviado: boolean = false;
  public email: string;
  public confirmarEmail: string;
  public password: string;
  public confirmarPassword: string;

  constructor(
    private _formBuilder: FormBuilder,
    private _service: UsuarioService,
    private _router: Router,
    private _sharedLoadingService: SharedLoadingService
  ) { }

  ngOnInit(): void {

    this.loginForm = this._formBuilder.group({
      email: ['', [
        Validators.required,
        Validators.email,
        Validators.maxLength(100)
      ]],
      confirmarEmail: ['', [Validators.required, this.equalsEmail()]],
      password: ['', [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(20),
        Validators.pattern('^.*((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$')
      ]],
      confirmarPassword: ['', [Validators.required]]
    });

  }

  onSubmit() {
    this._sharedLoadingService.emitChange(true);
    let login: Usuario = new Usuario(
      this.loginForm.value.email,
      this.loginForm.value.password,
      Role.Profissional
    );

    this._service.cadastrar(login).subscribe(response => {
      this.emailEnviado = true;
      setTimeout(() => {
        this._sharedLoadingService.emitChange(false);
        this.onSuccess(response.body.data.message);
        this._router.navigateByUrl(`espera-confirmacao-email`);
      });
    }, () => this._sharedLoadingService.emitChange(false));

  }

  setCaptcha(captcha: boolean) {
    this.captcha = captcha;
  }

  onSuccess(message: string) {
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: message,
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true
    });
  }

  equalsEmail(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      if (control.value == this.loginForm?.controls.email.value) {
        return null;
      } else {
        return { invalid: control.value }
      }
    };
  }

}
