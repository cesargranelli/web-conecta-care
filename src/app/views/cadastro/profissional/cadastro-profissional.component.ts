import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cadastro-profissional',
  templateUrl: './cadastro-profissional.component.html',
  styleUrls: ['./cadastro-profissional.component.css']
})
export class CadastroProfissionalComponent implements OnInit {

  public loading = false;

  constructor() { }

  ngOnInit(): void {
  }

  onSubmit() {}

  setLoading(loading: boolean) {
    this.loading = loading;
  }

}
