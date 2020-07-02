import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Navigation, Router } from '@angular/router';
import { Banco } from 'src/app/class/banco.class';
import { Conta } from 'src/app/class/conta.class';
import { TipoConta } from 'src/app/class/tipo-conta.class';
import { Role } from 'src/app/enums/role.enum';
import { ContaService } from 'src/app/services/conta.service';
import { DominioService } from 'src/app/services/dominio.service';
import { Valid } from 'src/app/services/feat/Valid';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-conta',
  templateUrl: './conta.component.html',
  styleUrls: ['./conta.component.css']
})
export class ContaComponent implements OnInit {

  contaForm: FormGroup;

  private _loading: boolean = true;
  private _valid: Valid;
  private _conta: Conta = new Conta();

  public tipoContas: TipoConta[];
  public bancos: Banco[];

  constructor(
    private _router: Router,
    private _formBuilder: FormBuilder,
    private _dominioService: DominioService,
    private _service: ContaService
  ) {
    const navigation: Navigation = this._router.getCurrentNavigation();
    this._valid = navigation.extras.state?.valid;
  }

  ngOnInit(): void {

    if (this?._valid?.role != Role.Profissional || !this?._valid?.role) {
      this._router.navigateByUrl('/');
    }

    this._dominioService.getTipoContas().subscribe(response => {
      this.tipoContas = response.body
    });

    this._dominioService.getBancos().subscribe(response => {
      this.bancos = response.body
    });

    this.contaForm = this._formBuilder.group({
      tipo: ['', [Validators.required]],
      banco: ['', [Validators.required]],
      agencia: ['', [Validators.required, Validators.maxLength(5)]],
      numero: ['', [Validators.required, Validators.maxLength(12)]],
      digito: ['', [Validators.required, Validators.maxLength(2)]],
    });

  }

  onSubmit() {
    this._loading = true;
    this._conta = this.contaForm.value;

    this._conta.proprietarioId = this._valid.id;

    this._service.save(this._conta).subscribe(response => {
      setTimeout(() => {
        this._loading = false;
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Cadastro realizado com sucesso!',
          showConfirmButton: false,
          timer: 2000
        });
        this._router.navigateByUrl(`cadastro/profissionais/${this._valid.id}`, {
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
