import { Component } from '@angular/core';
import { environment } from './../environments/environment';
import { SharedLoadingService } from './shared/services/shared-loading.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  public loading: boolean = false;

  constructor(private _sharedLoadingService: SharedLoadingService) {
    console.log(environment.name); // Logs false for default environment
    this._sharedLoadingService.changeEmitted$.subscribe(eventLoading => this.loading = eventLoading);
  }

  title = 'web-connecta';

}
