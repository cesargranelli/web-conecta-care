import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Router} from '@angular/router';
import {LoginService} from 'src/app/auth/services/login.service';
import {Valid} from 'src/app/services/feat/Valid';
import {SharedLoadingService} from 'src/app/shared/services/shared-loading.service';
import {ValidService} from 'src/app/shared/services/shared-valid.service';
import {Role} from 'src/app/enums/role.enum';

@Component({
  selector: 'pr-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  @Output() loadingEvent = new EventEmitter<boolean>();
  private valid: Valid;

  public loginForm: FormGroup;
  public habilitarEdicao: boolean = false;

  constructor(
    private router: Router,
    private _validService: ValidService,
    private formBuilder: FormBuilder,
    private service: LoginService,
    private _sharedLoadingService: SharedLoadingService
  ) {
    this._sharedLoadingService.emitChange(true);
    this.valid = this._validService.getValid();
  }

  ngOnInit(): void {
    if (this?.valid?.role != Role.Profissional || !this?.valid?.role) {
      this.router.navigateByUrl('/');
    }

    this.loginForm = this.formBuilder.group({
      email: [{value: '', disabled: true}]
    });

    this.service.verLogin().subscribe(response => {
      this.loginForm.controls.email.setValue(response.body.email);
    });

    this._sharedLoadingService.emitChange(false);

  }

  tooggle() {
    this.habilitarEdicao = !this.habilitarEdicao;
  }

  onSubmit() {
  }

}
