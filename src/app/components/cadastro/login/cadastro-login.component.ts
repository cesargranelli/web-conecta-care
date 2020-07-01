import { Component, EventEmitter, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { OK } from 'http-status-codes';
import { Role } from 'src/app/enums/role.enum';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';
import { Login } from 'src/app/class/login.class';

@Component({
  selector: 'app-cadastro-login',
  templateUrl: './cadastro-login.component.html',
  styleUrls: ['./cadastro-login.component.css']
})
export class CadastroLoginComponent implements OnInit {

  loginForm: FormGroup;

  captcha: boolean = false;

  emailEnviado: boolean = false;

  public loading = false;

  constructor(
    private formBuilder: FormBuilder,
    private service: UsuarioService,
    private route: Router
  ) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [
        Validators.required,
        Validators.email,
        Validators.maxLength(100)
      ]],
      confirmarEmail: ['', [Validators.required]],
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
    this.loading = true;
    let login: Login = new Login(
      this.loginForm.value.email,
      this.loginForm.value.password,
      Role.Profissional
    );

    this.service.cadastrar(login).subscribe(response => {
      console.debug('Response: ' + response.status)
      if (response.status===OK) {
        this.emailEnviado = true;
        setTimeout(() => {
          this.loading = false;
          this.onSuccess(response.body.data.message);
          this.route.navigateByUrl(`espera-confirmacao-email`);
        });
      }
    });

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

}
