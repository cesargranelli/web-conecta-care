import { Component, EventEmitter, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Endereco } from 'src/app/classes/endereco.class';
import { CadastroHomecaresService } from 'src/app/services/cadastro-homecares.service';
import { EnderecoService } from 'src/app/services/endereco.service';
import { Valid } from 'src/app/services/feat/Valid';
import { SharedLoadingService } from 'src/app/shared/services/shared-loading.service';
import { SharedValidService } from 'src/app/shared/services/shared-valid.service';
import Swal from 'sweetalert2';

declare var jQuery: any;

@Component({
  selector: 'app-cadastro-endereco-homecare',
  templateUrl: './cadastro-endereco.component.html',
  styleUrls: ['./cadastro-endereco.component.css']
})
export class CadastroEnderecoComponent implements OnInit {

  public valid: Valid;
  public linkBotaoVoltar: string;
  public nomeBotaoSubmit: string;
  public formularioCadastro: boolean;
  public onSubmitEvent = new EventEmitter<FormGroup>();

  constructor(
    private _validService: SharedValidService,
    private _service: EnderecoService,
    private _loading: SharedLoadingService,
    private _cadastro: CadastroHomecaresService
  ) {
    this.valid = this._validService.getValid();
  }

  ngOnInit(): void {
    this.linkBotaoVoltar = `cadastro/homecares/${this.valid.id}/informacoes-gerais`;
    this.nomeBotaoSubmit = 'Avançar';
    this.formularioCadastro = true;
  }

  onSubmit(endereco: Endereco) {
    this._loading.emitChange(true);
    this._service.save(endereco).subscribe(response => {
      setTimeout(() => {
        this._cadastro.endereco = endereco;
        // this._router.navigateByUrl(`cadastro/homecares/${this.valid.id}/contato`);
        this._loading.emitChange(false);
      });
    },
    () => {
      this._loading.emitChange(false);
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Ocorreu um erro inexperado ao tentar inserir endereço',
        showConfirmButton: true
      });
    });
  }

}
