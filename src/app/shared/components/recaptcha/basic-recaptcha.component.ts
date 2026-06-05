import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { RecaptchaModule } from 'ng-recaptcha-2';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-basic-recaptcha',
  standalone: true,
  imports: [RecaptchaModule],
  templateUrl: './basic-recaptcha.component.html',
  styleUrls: ['./basic-recaptcha.component.css']
})
export class BasicRecaptchaComponent implements OnInit {

  public siteKey: string;
  @Output() captcha = new EventEmitter<boolean>();

  ngOnInit(): void {
    this.siteKey = environment.siteKey;
  }

  resolved(captchaResponse: string) {
    if (captchaResponse != null) {
      this.captcha.emit(true);
    }
  }
}
