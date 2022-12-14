import { Component, EventEmitter, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ContatoHomeCare } from 'src/app/homecares/classes/contato-homecare.class';
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

  public valid: Valid;
  public isCadastro: boolean;
  public linkBotaoVoltar: string;
  public labelBotaoSubmit: string;
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
    this._loading.emitChange(true);
    this.valid = this._validService.getValid();
  }

  ngOnInit(): void {
    this.isCadastro = true;
    this.linkBotaoVoltar = `homecares/${this.valid?.id}/cadastro/endereco`;
    this.labelBotaoSubmit = 'Finalizar';
  }

  onSubmit(contato: ContatoHomeCare) {
    this._loading.emitChange(true);
    contato.idHomeCare = this.valid.id;
    contato.flagAceitePrivacidade = true;
    if (!this._cadastro.contato) {
      this._service.cadastrar(contato).subscribe(response => {
          setTimeout(() => {
            this._cadastro.contato = contato;
            // this._router.navigateByUrl(`homecares/${this.valid.id}`);
            this._router.navigate([`./login`]);
            this._loading.emitChange(false);
          });
        },
        () => {
          this._loading.emitChange(false);
          this.message();
        });
    } else {
      this._service.alterar(contato).subscribe(response => {
          setTimeout(() => {
            this._cadastro.contato = contato;
            // this._router.navigateByUrl(`homecares/${this.valid.id}`);
            this._router.navigate([`./login`]);
            this._loading.emitChange(false);
          });
        },
        () => {
          this._loading.emitChange(false);
          this.message();
        });
    }
  }

  message() {
    Swal.fire({
      position: 'center',
      icon: 'error',
      title: 'Ocorreu um erro inexperado ao tentar inserir endere??o',
      showConfirmButton: true
    });
  }

}
