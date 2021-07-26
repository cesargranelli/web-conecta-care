import {Component, EventEmitter, OnInit} from '@angular/core';
import {ContatoPaciente} from '../../classes/contato-paciente.class';
import {SharedValidService} from '../../../shared/services/shared-valid.service';
import {SharedLoadingService} from '../../../shared/services/shared-loading.service';
import {ContatoService} from '../../services/contato.service';
import {Router} from '@angular/router';
import Swal from 'sweetalert2';
import {FormGroup} from '@angular/forms';

@Component({
  selector: 'app-contato',
  templateUrl: './contato.component.html',
  styleUrls: ['./contato.component.css']
})
export class ContatoComponent implements OnInit {

  public isCadastro: boolean;
  public linkBotaoVoltar: string;
  public labelBotaoSubmit: string;
  public onSubmitEvent = new EventEmitter<FormGroup>();
  public contatoFormGroup: FormGroup;

  constructor(private _validService: SharedValidService,
              private _loading: SharedLoadingService,
              private _service: ContatoService,
              private _router: Router,
  ) {
  }

  ngOnInit(): void {
    this.isCadastro = false;
    this.linkBotaoVoltar = '../';
    this.labelBotaoSubmit = 'Alterar';
  }
  
  onSubmit(contato: ContatoPaciente) {
    this._loading.emitChange(true);
    console.log(contato);
    this._service.alterar(contato).subscribe(() => {
        setTimeout(() => {
          this._router.navigateByUrl(`pacientes/${this._validService.getValid().id}/dados`);
          this._loading.emitChange(false);
        });
      },
      () => {
        this._loading.emitChange(false);
        this.message();
      });
  }

  message() {
    Swal.fire({
      position: 'center',
      icon: 'error',
      title: 'Ocorreu um erro inexperado ao tentar inserir endereço',
      showConfirmButton: true
    });
  }

}
