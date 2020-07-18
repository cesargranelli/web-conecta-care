import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Navigation, Router } from '@angular/router';
import { LoginService } from 'src/app/auth/services/login.service';
import { Valid } from 'src/app/services/feat/Valid';
import { SharedLoadingService } from 'src/app/shared/services/shared-loading.service';

@Component({
  selector: 'pr-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  @Output() loadingEvent = new EventEmitter<boolean>();
  private _valid: Valid;

  public loginForm: FormGroup;
  public habilitarEdicao: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private service: LoginService,
    private router: Router,
    private loading: SharedLoadingService
  ) {
    const navigation: Navigation = this.router.getCurrentNavigation();
    this._valid = navigation.extras.state?.valid;
  }

  ngOnInit(): void {

    this.loading.emitChange(true);

    // if (this?._valid?.role != Role.Profissional || !this?._valid?.role) {
    //   this._router.navigateByUrl('/');
    // }

    this.loginForm = this.formBuilder.group({
      email: ['']
    });

    this.service.verLogin().subscribe(response => {
      this.loginForm.controls.email.setValue(response.body.email);
    });

    this.loading.emitChange(false);

  }

  tooggle() {
    this.habilitarEdicao = !this.habilitarEdicao;
  }

  onSubmit() {
  }

}
