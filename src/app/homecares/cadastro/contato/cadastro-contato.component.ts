import {Component, EventEmitter, Input, OnInit} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ContatoHomeCare } from 'src/app/classes/contatoHomeCare.class';
import { ContatoService } from 'src/app/homecares/services/contato.service';
import { CadastroHomeCaresService } from 'src/app/services/cadastro-homecares.service';
import { Valid } from 'src/app/services/feat/Valid';
import { SharedLoadingService } from 'src/app/shared/services/shared-loading.service';
import { SharedValidService } from 'src/app/shared/services/shared-valid.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cadastro-contato-homecare',
  templateUrl: './cadastro-contato.component.html',
  styleUrls: ['./cadastro-contato.component.css']
})
export class CadastroContatoComponent implements OnInit {

  @Input() isAlteracao: boolean;

  public valid: Valid;
  public linkBotaoVoltar: string;
  public nomeBotaoSubmit: string;
  public formularioCadastro: boolean;
  public onSubmitEvent = new EventEmitter<FormGroup>();

  public contatoFormGroup: FormGroup;
  public hideForm: boolean = true;

  constructor(
    private _validService: SharedValidService,
    private _loading: SharedLoadingService,
    private _service: ContatoService,
    private _router: Router,
    private _cadastro: CadastroHomeCaresService
  ) {
    this.valid = this._validService.getValid();
  }

  ngOnInit(): void {
    this._service.consultar(this.valid.id).subscribe(response => this._cadastro.endereco = response.body.data)
    this.linkBotaoVoltar = `homecares/${this.valid.id}/cadastro/endereco`;
    this.nomeBotaoSubmit = 'Finalizar';
    this.formularioCadastro = true;
  }

  onSubmit(contato: ContatoHomeCare) {
    this._loading.emitChange(true);
    contato.proprietarioId = this.valid.id;
    this._service.cadastrar(contato).subscribe(response => {
      setTimeout(() => {
        this._cadastro.contato = contato;
        this._router.navigateByUrl(`homecares/${this.valid.id}`);
        this._loading.emitChange(false);
      });
    },
    () => {
      this._loading.emitChange(false);
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Ocorreu um erro inexperado ao tentar inserir contato',
        showConfirmButton: true
      });
    });
  }

}
