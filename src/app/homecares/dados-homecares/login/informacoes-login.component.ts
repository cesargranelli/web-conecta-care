import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {LoginService} from 'src/app/auth/services/login.service';
import {SharedLoadingService} from 'src/app/shared/services/shared-loading.service';

@Component({
  selector: 'pr-login',
  templateUrl: './informacoes-login.component.html',
  styleUrls: ['./informacoes-login.component.css']
})
export class InformacoesLoginComponent implements OnInit {

  @Output() loadingEvent = new EventEmitter<boolean>();

  public loginForm: FormGroup;
  public habilitarEdicao: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private service: LoginService,
    private _sharedLoadingService: SharedLoadingService
  ) {
    this._sharedLoadingService.emitChange(true);
  }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: [{value: '', disabled: true}]
    });

    this.service.verLogin().subscribe(response => {
      this.loginForm.controls.email.setValue(response.body?.email);
      this._sharedLoadingService.emitChange(false);
    });
  }

  tooggle() {
    this.habilitarEdicao = !this.habilitarEdicao;
  }

  onSubmit() {
  }

}
