import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { EstadoCivil } from 'src/app/class/estado-civil.class';
import { Genero } from 'src/app/class/genero.class';
import { Profissional } from 'src/app/class/profissional.class';
import { TipoEmpresa } from 'src/app/class/tipo-empresa.class';
import { DominioService } from 'src/app/services/dominio.service';
import { ProfissionalService } from 'src/app/services/profissional.service';
import { ValidadorCnpj } from '../../../../utils/validador-cnpj.utils';
import { ValidadorCpf } from '../../../../utils/validador-cpf.utils';

@Component({
  selector: 'app-informacoes-gerais',
  templateUrl: './informacoes-gerais.component.html',
  styleUrls: ['./informacoes-gerais.component.css']
})
export class InformacoesGeraisComponent implements OnInit {

  private _loading: boolean = false;

  public profissionalForm: FormGroup;

  public mascaraCpf: string = '000.000.000-00';
  public mascaraData: string = '00/00/0000';
  public mascaraRg: string = '000.000.000-00';
  public mascaraPIS: string = '000.0000.000-0';
  public mascaraCnpj: string = '00.000.000/0000-00';
  public generos: Genero[];
  public tipoEmpresas: TipoEmpresa[];
  public estadoCivis: EstadoCivil[];

  public selectFile: File;
  public fotoProfissional: any;
  public fotoRg: any;

  constructor(
    private _formBuilder: FormBuilder,
    private _validadorCpf: ValidadorCpf,
    private _validadorCnpj: ValidadorCnpj,
    private _service: ProfissionalService,
    private _dominioService: DominioService
  ) { }

  ngOnInit(): void {

    this._dominioService.getGeneros().subscribe(response => {
      this.generos = response.body
    });
    this._dominioService.getTipoEmpresas().subscribe(response => {
      this.tipoEmpresas = response.body
    });
    this._dominioService.getEstadoCivis().subscribe(response => {
      this.estadoCivis = response.body
    });

    this.profissionalForm = this._formBuilder.group({
      nome: ['', [Validators.required, Validators.maxLength(40)]],
      sobrenome: ['', [Validators.required, Validators.maxLength(60)]],
      cpf: ['', [Validators.required, this.cpfValidator()]],
      dataNascimento: ['', [Validators.required]],
      rg: ['', []],
      rgEmissor: ['', [Validators.required]],
      rgDataEmissao: ['', [Validators.required]],
      pis: ['', []],
      genero: [this.generos, [Validators.required]],
      tipoEmpresa: [this.tipoEmpresas, [Validators.required]],
      estadoCivil: [this.estadoCivis, [Validators.required]],
      cnpj: ['', [Validators.required, this.cnpjValidator()]],
      ctps: ['', [Validators.required]],
      ctpsSerie: ['', [Validators.required]],
      fotoProfissional: ['', [Validators.required]],
      fotoRg: ['', [Validators.required]],
    });

  }

  onLoadFotoProfissional(event:any) {
    const file: File = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = this.handlerReaderLoadedProfissional.bind(this);
      reader.readAsBinaryString(file);
    }
  }

  handlerReaderLoadedProfissional(e:any) {
    this.fotoProfissional = btoa(e.target.result);
  }

  onLoadFotoRg(event:any) {
    const file: File = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = this.handlerReaderLoadedRg.bind(this);
      reader.readAsBinaryString(file);
    }
  }

  handlerReaderLoadedRg(e:any) {
    this.fotoRg = btoa(e.target.result);
  }

  onSubmit() {
    let profissional: Profissional = this.profissionalForm.value;

    profissional.fotoProfissional = this.fotoProfissional;
    profissional.fotoRg = this.fotoRg;

    this._service.save(profissional).subscribe(response => {
      console.log(response.body.data);
    });
  }

  cpfValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      if (control.value.length != 11) {
        return { cpfInvalido: control.value };
      } else {
        if (!this._validadorCpf.validar(control.value)) {
          return { cpfInvalido: control.value };
        } else {
          return null;
        }
      }
    };
  }

  cnpjValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      if (control.value.length != 14) {
        return { cnpjInvalido: control.value };
      } else {
        if (!this._validadorCnpj.validar(control.value)) {
          return { cnpjInvalido: control.value };
        } else {
          return null;
        }
      }
    };
  }

}
