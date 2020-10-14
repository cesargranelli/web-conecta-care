import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-basic-recaptcha',
  templateUrl: './basic-recaptcha.component.html',
  styleUrls: ['./basic-recaptcha.component.css']
})
export class BasicRecaptchaComponent implements OnInit {

  public siteKey: string;
  @Output() captcha = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit(): void {
    this.siteKey = environment.siteKey;
  }

  resolved(captchaResponse: string) {
    if (captchaResponse != null) {
      this.captcha.emit(true);
    }
  }

}
