import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Navigation, Router } from '@angular/router';
import { CategoriaCNH } from 'src/app/class/categoria-cnh.class';
import { Complemento } from 'src/app/class/complemento.class';
import { Role } from 'src/app/enums/role.enum';
import { ComplementoService } from 'src/app/services/complemento.service';
import { DominioService } from 'src/app/services/dominio.service';
import { Valid } from 'src/app/services/feat/Valid';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-complemento',
  templateUrl: './complemento.component.html',
  styleUrls: ['./complemento.component.css']
})
export class ComplementoComponent implements OnInit {

  complementoForm: FormGroup;

  private _loading: boolean = true;
  private _valid: Valid;
  private _complemento: Complemento = new Complemento();

  public categoriasCNH: CategoriaCNH[];
  public fotoCNH: any;

  constructor(
    private _router: Router,
    private _formBuilder: FormBuilder,
    private _dominioService: DominioService,
    private _service: ComplementoService
  ) {
    const navigation: Navigation = this._router.getCurrentNavigation();
    this._valid = navigation.extras.state?.valid;
  }

  ngOnInit(): void {

    if (this?._valid?.role != Role.Profissional || !this?._valid?.role) {
      this._router.navigateByUrl('/');
    }

    this._dominioService.getCategoriasCNH().subscribe(response => {
      this.categoriasCNH = response.body
    });

    this.complementoForm = this._formBuilder.group({
      tituloEleitoral: [null, [Validators.maxLength(11)]],
      zonaEleitoral: ['', [Validators.maxLength(3)]],
      secaoEleitoral: ['', [Validators.maxLength(4)]],
      numeroHabilitacao: ['', [Validators.required, Validators.maxLength(11)]],
      dataValidadeHabilitacao: ['', [Validators.required]],
      categoriaCNH: ['', [Validators.required]],
      fotoCNH: ['', [Validators.required]],
      numeroReservista: [null],
      nomeMae: ['', [Validators.required, Validators.maxLength(100)]],
      profissaoMae: ['', [Validators.maxLength(60)]],
      nomePai: ['', [Validators.required, Validators.maxLength(100)]],
      profissaoPai: ['', [Validators.maxLength(60)]],
      nomeConjuge: ['', [Validators.required, Validators.maxLength(100)]],
      profissaoConjuge: ['', [Validators.maxLength(60)]],
      filhos: [{}],
      carteiraVacinacao: ['', [Validators.required]],
    });

  }

  onSubmit() {
    this._loading = true;
    this._complemento = this.complementoForm.value;

    this._complemento.fotoCNH = this.fotoCNH;

    this._complemento.proprietarioId = this._valid.id;

    this._service.save(this._complemento).subscribe(response => {
      setTimeout(() => {
        this._router.navigateByUrl(`cadastro/profissionais/${this._valid.id}/conta`, {
          state: { valid: this._valid }
        });
        this._loading = false;
      });
    },
    (error: Error) => {
      this._loading = false;
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Ocorreu um erro inexperado ao tentar inserir profissional',
        showConfirmButton: true
      });
    });

  }

  onLoadFotoCNH(event:any) {
    const file: File = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = this.handlerReaderLoadedProfissional.bind(this);
      reader.readAsBinaryString(file);
    }
  }

  handlerReaderLoadedProfissional(e:any) {
    this.fotoCNH = btoa(e.target.result);
  }

}
