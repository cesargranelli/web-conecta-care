import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-espera-confirmacao-email',
  templateUrl: './espera-confirmacao-email.component.html',
  styleUrls: ['./espera-confirmacao-email.component.css']
})
export class EsperaConfirmacaoEmailComponent implements OnInit {

  public loading = false;

  constructor() { }

  ngOnInit(): void {
    this.loading = true;
    this.loading = false;
  }

}
