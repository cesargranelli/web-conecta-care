import {Component, EventEmitter, OnInit} from '@angular/core';
import {Valid} from '../../../services/feat/Valid';
import {FormGroup} from '@angular/forms';
import {SharedValidService} from '../../../shared/services/shared-valid.service';
import {SharedLoadingService} from '../../../shared/services/shared-loading.service';
import {EnderecoService} from '../../../homecares/services/endereco.service';
import {Router} from '@angular/router';
import {CadastroHomeCaresService} from '../../../services/cadastro-homecares.service';
import {HttpErrorResponse} from '@angular/common/http';
import {EnderecoHomeCare} from '../../../homecares/classes/endereco-homecare.class';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-endereco',
  templateUrl: './cadastro-endereco.component.html',
  styleUrls: ['./cadastro-endereco.component.css']
})
export class CadastroEnderecoComponent implements OnInit {

  public valid: Valid;
  public isCadastro: boolean;
  public linkBotaoVoltar: string;
  public labelBotaoSubmit: string;
  public onSubmitEvent = new EventEmitter<FormGroup>();

  constructor(
    private _validService: SharedValidService,
    private _loading: SharedLoadingService,
    private _service: EnderecoService,
    private _router: Router,
    private _cadastro: CadastroHomeCaresService
  ) {
    this._loading.emitChange(true);
    this.valid = this._validService.getValid();
  }

  ngOnInit(): void {
    // this._service.consultar(this.valid.id).subscribe(response =>
    //     this._cadastro.endereco = response.body.data,
    //   (errorResponse: HttpErrorResponse) => {
    //     if (errorResponse.status === 404) {
    //       console.log('Não existem dados cadastrados!');
    //     }
    //   }
    // );
    this.isCadastro = true;
    this.linkBotaoVoltar = `pacientes/${this.valid.id}/cadastro/informacoes-gerais`;
    this.labelBotaoSubmit = 'Avançar';
  }

  onSubmit(endereco: EnderecoHomeCare) {
    this._loading.emitChange(true);
    endereco.idHomeCare = this.valid.id;
    if (!this._cadastro.endereco.id) {
      this._service.cadastrar(endereco).subscribe(response => {
          this.navigate(endereco);
        },
        () => {
          this.message();
        });
    } else {
      this._service.alterar(endereco).subscribe(response => {
          this.navigate(endereco);
        },
        () => {
          this.message();
        });
    }
  }

  private navigate(endereco: EnderecoHomeCare) {
    setTimeout(() => {
      this._cadastro.endereco = endereco;
      this._router.navigateByUrl(`homecares/${this.valid.id}/cadastro/contato`);
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
