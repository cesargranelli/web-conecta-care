import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Navigation, Router } from '@angular/router';
import { Endereco } from 'src/app/class/endereco.class';
import { Estado } from 'src/app/class/estado.class';
import { DominioService } from 'src/app/services/dominio.service';
import { EnderecoService } from 'src/app/services/endereco.service';
import { Valid } from 'src/app/services/feat/Valid';
import Swal from 'sweetalert2';
import { Role } from 'src/app/enums/role.enum';

@Component({
  selector: 'app-endereco',
  templateUrl: './endereco.component.html',
  styleUrls: ['./endereco.component.css']
})
export class EnderecoComponent implements OnInit {

  enderecoForm: FormGroup;

  private _loading: boolean = true;
  private _valid: Valid;
  private _endereco: Endereco;

  public estados: Estado;
  public comprovante: any;

  constructor(
    private _router: Router,
    private _formBuilder: FormBuilder,
    private _dominioService: DominioService,
    private _service: EnderecoService
  ) {
    const navigation: Navigation = this._router.getCurrentNavigation();
    this._valid = navigation.extras.state?.valid;
  }

  ngOnInit(): void {

    if (this?._valid?.role != Role.Profissional || !this?._valid?.role) {
      this._router.navigateByUrl('/');
    }

    this._dominioService.getEstados().subscribe(response => {
      this.estados = response.body
    });

    this.enderecoForm = this._formBuilder.group({
      logradouro: ['', [Validators.required, Validators.maxLength(60)]],
      numero: ['', [Validators.required, Validators.maxLength(10)]],
      complemento: ['', [Validators.maxLength(60)]],
      cep: ['', [Validators.required, Validators.maxLength(8)]],
      bairro: ['', [Validators.required, Validators.maxLength(50)]],
      cidade: ['', [Validators.required, Validators.maxLength(50)]],
      comprovante: ['', [Validators.required]],
      estado: ['', [Validators.required]],
    });

    this._loading = false;
  }

  onSubmit() {
    this._loading = true;
    this._endereco = this.enderecoForm.value;

    this._endereco.comprovante = this.comprovante;
    this._endereco.proprietarioId = this._valid.id;

    this._service.save(this._endereco).subscribe(response => {
      setTimeout(() => {
        this._router.navigateByUrl(`cadastro/profissionais/${this._valid.id}/contato`, {
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

  onLoad(event:any) {
    const file: File = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = this.handlerReaderLoadedProfissional.bind(this);
      reader.readAsBinaryString(file);
    }
  }

  handlerReaderLoadedProfissional(e:any) {
    this.comprovante = btoa(e.target.result);
  }

}
