import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Contato } from 'src/app/classes/contato.class';
import { Estado } from 'src/app/classes/estado.class';
import { ContatoService } from 'src/app/services/contato.service';
import { Valid } from 'src/app/services/feat/Valid';
import { SharedLoadingService } from 'src/app/shared/services/shared-loading.service';
import { SharedValidService } from 'src/app/shared/services/shared-valid.service';
import { InputValidationHas } from 'src/app/shared/validations/input-validation-has';

@Component({
  selector: 'app-form-complemento',
  templateUrl: './form-complemento.component.html',
  styleUrls: ['./form-complemento.component.css']
})
export class FormComplementoComponent implements OnInit {

  @Output() loadingEvent = new EventEmitter<boolean>();
  public validationHas: InputValidationHas = new InputValidationHas();
  public codigoPais: string = '+55';
  public estados: Array<Estado> = [];
  public hiddenForm: boolean;
  public contatoForm: FormGroup;
  private _valid: Valid;
  private _contato: Contato;

  constructor(
    private _router: Router,
    private _validService: SharedValidService,
    private _formBuilder: FormBuilder,
    private _service: ContatoService,
    // private _dominioService: PacienteService,
    private _loading: SharedLoadingService
  ) {
    this._valid = this._validService.getValid();

    this.contatoForm = this._formBuilder.group({
      telefoneFixo: [null],
      telefoneRecado: [null],
      celularPrincipal: [null, [Validators.required]],
      celularSecundario: [null],
    });
  }

  ngOnInit(): void {
    // this._dominioService.listarEstado().pipe(
    //   map((response) => {
    //     this._loading.emitChange(true);
    //     this.estados = response.body;
    //   }),
    //   concatMap(() => this._service.getDados(this._valid.id))
    // ).subscribe(response => {
    //     this.popularForm();
    //     setTimeout(() => {
    //       this._loading.emitChange(false);
    //     });
    //   }, null, () => this.contatoForm = false);

  }

  popularForm() {
    this.contatoForm.patchValue({
      telefoneFixo: this._contato?.telefoneFixo ? String(this._contato?.telefoneFixo).substring(2) : null,
      telefoneRecado: this._contato?.telefoneRecado ? String(this._contato?.telefoneRecado).substring(2) : null,
      celularPrincipal: this._contato?.celularPrincipal ? String(this._contato?.celularPrincipal).substring(2) : null,
      celularSecundario: this._contato?.celularSecundario ? String(this._contato?.celularSecundario).substring(2) : null
    });
  }

  onSubmit() {
    this._loading.emitChange(true);
    this._contato = this.contatoForm.value;
    this._contato.proprietarioId = this._valid.id;
    this._contato.telefoneFixo = this._contato.telefoneFixo ? Number(String(this.codigoPais) + String(this._contato.telefoneFixo)) : null;
    this._contato.telefoneRecado = this._contato.telefoneRecado ? Number(String(this.codigoPais) + String(this._contato.telefoneRecado)) : null;
    this._contato.celularPrincipal = this._contato.celularPrincipal ? Number(String(this.codigoPais) + String(this._contato.celularPrincipal)) : null;
    this._contato.celularSecundario = this._contato.celularSecundario ? Number(String(this.codigoPais) + String(this._contato.celularSecundario)) : null;

    // this._service.save(this._contato).subscribe(response => {
    //   setTimeout(() => {
    //     this._cadastro.contato = this._contato;
    //     this._router.navigateByUrl(`profissionais/${this._valid.id}/dados-profissionais`);
    //     Swal.fire({
    //       position: 'center',
    //       icon: 'success',
    //       title: 'Alteração realizada com sucesso!',
    //       showConfirmButton: false,
    //       timer: 2000
    //     });
    //     this._loading.emitChange(false);
    //   });
    // }, () => {
    //   this._loading.emitChange(false);
    //   Swal.fire({
    //     position: 'center',
    //     icon: 'error',
    //     title: 'Ocorreu um erro inexperado ao tentar alterar os dados de contato',
    //     showConfirmButton: true
    //   });
    // });
  }


}
