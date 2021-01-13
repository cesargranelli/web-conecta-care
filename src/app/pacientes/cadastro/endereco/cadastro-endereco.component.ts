import {Component, EventEmitter, OnInit} from '@angular/core';
import {Valid} from '../../../services/feat/Valid';
import {FormGroup} from '@angular/forms';
import {SharedValidService} from '../../../shared/services/shared-valid.service';
import {SharedLoadingService} from '../../../shared/services/shared-loading.service';
import {Router} from '@angular/router';
import Swal from 'sweetalert2';
import {EnderecoPaciente} from "../../classes/endereco-paciente.class";
import {EnderecoService} from "../../services/endereco.service";

@Component({
  selector: 'app-endereco',
  templateUrl: './cadastro-endereco.component.html',
  styleUrls: ['./cadastro-endereco.component.css']
})
export class CadastroEnderecoComponent implements OnInit {

  public _dadosLocalStorage: Valid;
  public isCadastro: boolean;
  public linkBotaoVoltar: string;
  public labelBotaoSubmit: string;
  public onSubmitEvent = new EventEmitter<FormGroup>();

  constructor(
    private _validService: SharedValidService,
    private _loading: SharedLoadingService,
    private _service: EnderecoService,
    private _router: Router
  ) {
    this._loading.emitChange(true);
    this._dadosLocalStorage = this._validService.getValid();
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
    this.linkBotaoVoltar = `pacientes/${this._dadosLocalStorage.id}/cadastro/informacoes-gerais`;
    this.labelBotaoSubmit = 'Avançar';
  }

  onSubmit(endereco: EnderecoPaciente) {
    this._loading.emitChange(true);
    endereco.idPaciente = this._dadosLocalStorage.id;
    console.log(endereco);
    this._service.cadastrar(endereco).subscribe(() => {
      setTimeout(() => {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Alteração realizada com sucesso!',
          showConfirmButton: false,
          timer: 2000
        });
        this._router.navigateByUrl(`pacientes/${this._dadosLocalStorage.id}/cadastro/contato`);
        this._loading.emitChange(false);
      });
    });
  }

  // private navigate(endereco: EnderecoHomeCare) {
  //   setTimeout(() => {
  //     this._cadastro.endereco = endereco;
  //     this._router.navigateByUrl(`homecares/${this._dadosLocalStorage.id}/cadastro/contato`);
  //     this._loading.emitChange(false);
  //   });
  // }

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
