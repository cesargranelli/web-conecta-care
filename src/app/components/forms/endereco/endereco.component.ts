import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Navigation, Router } from '@angular/router';
import { Endereco } from 'src/app/classes/endereco.class';
import { Estado } from 'src/app/classes/estado.class';
import { Role } from 'src/app/enums/role.enum';
import { DominioService } from 'src/app/services/dominio.service';
import { EnderecoService } from 'src/app/services/endereco.service';
import { Valid } from 'src/app/services/feat/Valid';
import { SharedLoadingService } from 'src/app/shared/services/shared-loading.service';
import { InputValidationHas } from 'src/app/shared/validations/input-validation-has';
import Swal from 'sweetalert2';
import { CadastroProfissionaisService } from 'src/app/services/cadastro-profissionais.service';

@Component({
  selector: 'app-endereco',
  templateUrl: './endereco.component.html',
  styleUrls: ['./endereco.component.css']
})
export class EnderecoComponent implements OnInit {

  @Output() loadingEvent = new EventEmitter<boolean>();

  enderecoForm: FormGroup;

  public _valid: Valid;
  private _endereco: Endereco;

  public validationHas: InputValidationHas = new InputValidationHas();
  public estados: Estado;
  public comprovante: any;

  private _extensaoComprovante: string;

  constructor(
    private _router: Router,
    private _formBuilder: FormBuilder,
    private _dominioService: DominioService,
    private _service: EnderecoService,
    private _sharedLoadingService: SharedLoadingService,
    private _cadastro: CadastroProfissionaisService
  ) {
    const navigation: Navigation = this._router.getCurrentNavigation();
    this._valid = navigation.extras.state?.valid;
  }

  ngOnInit(): void {

    this._sharedLoadingService.emitChange(true);

    if (this?._valid?.role != Role.Profissional || !this?._valid?.role) {
      this._router.navigateByUrl('/');
    }

    this._dominioService.getEstados().subscribe(response => {
      this.estados = response.body
    });

    this.enderecoForm = this._formBuilder.group({
      logradouro: [this._cadastro.endereco?.logradouro, [Validators.required, Validators.maxLength(60)]],
      numero: [this._cadastro.endereco?.numero, [Validators.required, Validators.maxLength(10)]],
      complemento: [this._cadastro.endereco?.complemento, [Validators.maxLength(60)]],
      cep: [this._cadastro.endereco?.cep, [Validators.required, Validators.maxLength(8)]],
      bairro: [this._cadastro.endereco?.bairro, [Validators.required, Validators.maxLength(50)]],
      cidade: [this._cadastro.endereco?.cidade, [Validators.required, Validators.maxLength(50)]],
      comprovante: ['', [Validators.required]],
      estado: ['', [Validators.required]],
    });

    this._sharedLoadingService.emitChange(false);

  }

  onSubmit() {
    this._sharedLoadingService.emitChange(true);
    this._endereco = this.enderecoForm.value;

    this._endereco.comprovante = this._extensaoComprovante + this.comprovante;
    this._endereco.proprietarioId = this._valid.id;

    this._service.save(this._endereco).subscribe(response => {
      setTimeout(() => {
        this._cadastro.endereco = this._endereco;
        this._router.navigateByUrl(`cadastro/profissionais/${this._valid.id}/contato`, {
          state: { valid: this._valid }
        });
        this._sharedLoadingService.emitChange(false);
      });
    },
    (error: Error) => {
      this._sharedLoadingService.emitChange(false);
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Ocorreu um erro inexperado ao tentar inserir endereço',
        showConfirmButton: true
      });
    });
  }

  onLoad(event:any) {
    const file: File = event.target.files[0];
    let type: string[] = file.type.split('/');
    this._extensaoComprovante = type[1].padEnd(5, ' ');
    if (file) {
      const reader = new FileReader();
      reader.onload = this.handlerReaderLoadedProfissional.bind(this);
      reader.readAsBinaryString(file);
    }
  }

  handlerReaderLoadedProfissional(e:any) {
    this.comprovante = btoa(e.target.result);
  }

  onReturn() {
    this._router.navigateByUrl(`cadastro/profissionais/${this._valid.id}/informacoes-gerais`, {
      state: { valid: this._valid }
    });
  }

}
