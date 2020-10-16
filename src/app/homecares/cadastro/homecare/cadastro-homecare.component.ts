import {Component, EventEmitter, Input, OnInit} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {Router} from '@angular/router';
import {HomeCare} from 'src/app/classes/homecare.class';
import {HomecareService} from 'src/app/homecares/services/homecare.service';
import {CadastroHomeCaresService} from 'src/app/services/cadastro-homecares.service';
import {Valid} from 'src/app/services/feat/Valid';
import {SharedLoadingService} from 'src/app/shared/services/shared-loading.service';
import {SharedValidService} from 'src/app/shared/services/shared-valid.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cadastro-homecare',
  templateUrl: './cadastro-homecare.component.html',
  styleUrls: ['./cadastro-homecare.component.css']
})
export class CadastroHomeCareComponent implements OnInit {

  @Input()
  public isAlteracao: boolean;

  public valid: Valid;
  public linkBotaoVoltar: string;
  public onSubmitEvent = new EventEmitter<FormGroup>();

  constructor(
    private _validService: SharedValidService,
    private _loading: SharedLoadingService,
    private _service: HomecareService,
    private _router: Router,
    private _cadastro: CadastroHomeCaresService
  ) {
    this.valid = this._validService.getValid();
  }

  ngOnInit(): void {
    this._service.consultar(this.valid.id).subscribe(response => this._cadastro.homeCare = response.body.data);
    this.linkBotaoVoltar = `homecares/${this.valid.id}`;
  }

  onSubmit(homeCare: HomeCare) {
    this._loading.emitChange(true);
    homeCare.id = this.valid.id;
    this._service.cadastrar(homeCare).subscribe(response => {
        setTimeout(() => {
          this._router.navigateByUrl(`homecares/${this.valid.id}/cadastro/endereco`);
          this._loading.emitChange(false);
        });
      },
      () => {
        this._loading.emitChange(false);
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'Ocorreu um erro inexperado ao tentar inserir HomeCare',
          showConfirmButton: true
        });
      });
  }

}
