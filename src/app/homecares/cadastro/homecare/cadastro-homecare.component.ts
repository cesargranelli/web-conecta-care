import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { HomeCare } from 'src/app/classes/homecare.class';
import { HomecareService } from 'src/app/homecares/services/homecare.service';
import { CadastroHomeCaresService } from 'src/app/services/cadastro-homecares.service';
import { Valid } from 'src/app/services/feat/Valid';
import { SharedLoadingService } from 'src/app/shared/services/shared-loading.service';
import { SharedValidService } from 'src/app/shared/services/shared-valid.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cadastro-homecare',
  templateUrl: './cadastro-homecare.component.html',
  styleUrls: ['./cadastro-homecare.component.css']
})
export class CadastroHomeCareComponent implements OnInit {

  public valid: Valid;
  public isCadastro: boolean;
  public linkBotaoVoltar: string;
  public labelBotaoSubmit: string;
  public onSubmitEvent = new EventEmitter<FormGroup>();

  constructor(
    private _validService: SharedValidService,
    private _loading: SharedLoadingService,
    private _service: HomecareService,
    private _router: Router,
    private _cadastro: CadastroHomeCaresService
  ) {
    this._loading.emitChange(true);
    this.valid = this._validService.getValid();
  }

  ngOnInit(): void {
    this._service.consultar(this.valid.id).subscribe(response =>
        this._cadastro.homeCare = response.body.data,
      (errorResponse: HttpErrorResponse) => {
        if (errorResponse.status === 404) {
          console.log('Não existem dados cadastrados!');
        }
      }
    );
    this.isCadastro = true;
    this.linkBotaoVoltar = `homecares/${this.valid.id}`;
    this.labelBotaoSubmit = 'Avançar';
  }

  onSubmit(homeCare: HomeCare) {
    this._loading.emitChange(true);
    homeCare.id = this.valid.id;
    if (!this._cadastro.homeCare) {
      this._service.cadastrar(homeCare).subscribe(response => {
          this.navigate(homeCare);
        },
        () => {
          this.message();
        });
    } else {
      this._service.alterar(homeCare).subscribe(response => {
          this.navigate(homeCare);
        },
        () => {
          this.message();
        });
    }
  }

  private navigate(homeCare: HomeCare) {
    setTimeout(() => {
      this._cadastro.homeCare = homeCare;
      this._router.navigateByUrl(`homecares/${this.valid.id}/cadastro/endereco`);
      this._loading.emitChange(false);
    });
  }

  private message() {
    this._loading.emitChange(false);
    Swal.fire({
      position: 'center',
      icon: 'error',
      title: 'Ocorreu um erro inexperado ao tentar inserir endereço',
      showConfirmButton: true
    });
  }

}
