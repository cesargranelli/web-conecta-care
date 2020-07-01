import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Navigation, Router } from '@angular/router';
import { Contato } from 'src/app/class/contato.class';
import { Role } from 'src/app/enums/role.enum';
import { ContatoService } from 'src/app/services/contato.service';
import { Valid } from 'src/app/services/feat/Valid';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-contato',
  templateUrl: './contato.component.html',
  styleUrls: ['./contato.component.css']
})
export class ContatoComponent implements OnInit {

  private _loading: boolean = true;
  private _valid: Valid;
  private _contato: Contato;

  contatoForm: FormGroup;

  constructor(
    private _router: Router,
    private _formBuilder: FormBuilder,
    private _service: ContatoService
  ) {
    const navigation: Navigation = this._router.getCurrentNavigation();
    this._valid = navigation.extras.state?.valid;
  }

  ngOnInit(): void {

    if (this?._valid?.role != Role.Profissional || !this?._valid?.role) {
      this._router.navigateByUrl('/');
    }

    this.contatoForm = this._formBuilder.group({
      telefoneFixo: ['', Validators.maxLength(10)],
      telefoneRecado: ['', Validators.maxLength(10)],
      celularPrincipal: ['', [Validators.required, Validators.maxLength(11)]],
      celularSecundario: ['', Validators.maxLength(11)],
    });

    this._loading = false;

  }

  onSubmit() {
    this._loading = true;
    this._contato = this.contatoForm.value;

    this._contato.proprietarioId = this._valid.id;

    this._service.save(this._contato).subscribe(response => {
      setTimeout(() => {
        this._router.navigateByUrl(`cadastro/profissionais/${this._valid.id}/carreira`, {
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

}
