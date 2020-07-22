import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Endereco } from 'src/app/classes/endereco.class';
import { Estado } from 'src/app/classes/estado.class';
import { Role } from 'src/app/enums/role.enum';
import { CadastroProfissionaisService } from 'src/app/services/cadastro-profissionais.service';
import { DominioService } from 'src/app/services/dominio.service';
import { EnderecoService } from 'src/app/services/endereco.service';
import { Valid } from 'src/app/services/feat/Valid';
import { SharedLoadingService } from 'src/app/shared/services/shared-loading.service';
import { ValidService } from 'src/app/shared/services/shared-valid.service';
import { InputValidationHas } from 'src/app/shared/validations/input-validation-has';
import Swal from 'sweetalert2';

declare var jQuery: any;

@Component({
  selector: 'app-endereco',
  templateUrl: './endereco.component.html',
  styleUrls: ['./endereco.component.css']
})
export class EnderecoComponent implements OnInit {

  @Output() loadingEvent = new EventEmitter<boolean>();

  enderecoForm: FormGroup;

  private _endereco: Endereco;
  private _fileComprovante: File;

  public estados: Estado[];
  public valid: Valid;

  public comprovante: any;
  public fileInputComprovante: string = 'fileinput-new';
  public imagemComprovante: string = '../../../../../assets/img/Headshot-Doc-1.png';

  public validationHas: InputValidationHas = new InputValidationHas();

  constructor(
    private _router: Router,
    private _validService: ValidService,
    private _formBuilder: FormBuilder,
    private _dominioService: DominioService,
    private _service: EnderecoService,
    private _loading: SharedLoadingService,
    private _cadastro: CadastroProfissionaisService
  ) {
    this.valid = this._validService.getValid();
  }

  ngOnInit(): void {

    this._loading.emitChange(true);

    if (this?.valid?.role != Role.Profissional || !this?.valid?.role) {
      this._router.navigateByUrl('/');
    }

    this._dominioService.getEstados().subscribe(response => {
      this.estados = response.body
    }, null, () => {
      setTimeout(() => {
        jQuery("select[id='estado']").selectpicker('refresh');
      })
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

    if (this._cadastro.endereco?.comprovante) {
      this.imagemComprovante = '../../../../../assets/img/Headshot-Doc-1.png';
      this.comprovante = this._cadastro.endereco?.comprovante;
      this.fileInputComprovante = 'fileinput-exists';
    }

    this._loading.emitChange(false);

  }

  onSubmit() {
    this._loading.emitChange(true);
    this._endereco = this.enderecoForm.value;

    this._endereco.comprovante = this.comprovante;
    this._endereco.proprietarioId = this.valid.id;

    this._service.save(this._endereco).subscribe(response => {
      setTimeout(() => {
        this._cadastro.endereco = this._endereco;
        this._router.navigateByUrl(`cadastro/profissionais/${this.valid.id}/contato`, {
          state: { valid: this.valid }
        });
        this._loading.emitChange(false);
      });
    },
    (error: Error) => {
      this._loading.emitChange(false);
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Ocorreu um erro inexperado ao tentar inserir endereço',
        showConfirmButton: true
      });
    });
  }

  onLoadComprovante(event: any) {
    this._fileComprovante = event.target.files[0];
    var reader = new FileReader();
    reader.readAsDataURL(this._fileComprovante);
    reader.onload = () => {
      this.comprovante = reader.result;
    };
  }

  onReturn() {
    this._router.navigateByUrl(`cadastro/profissionais/${this.valid.id}/informacoes-gerais`, {
      state: { valid: this.valid }
    });
  }

  limpar() {
    this.enderecoForm.reset();
    jQuery('.fileinput').fileinput('clear');
    jQuery(".selectpicker").selectpicker('refresh');
    this.imagemComprovante = '../../../../../assets/img/Headshot-Doc-1.png';
  }

}
