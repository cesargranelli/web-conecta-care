import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-connecta',
  templateUrl: './connecta.component.html',
  styleUrls: ['./connecta.component.css']
})
export class ConnectaComponent implements OnInit {

  public texto: string = 'Wenceslau Braz - Cuidado com as cargas';
  public lat: number = -15.8779431;
  public lng: number = -49.8046873;
  public zoom: number = 15;
  public anoAtual: number;

  constructor() {
  }

  ngOnInit(): void {
    this.anoAtual = new Date().getUTCFullYear();
  }

}
