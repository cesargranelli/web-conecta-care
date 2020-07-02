import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, Navigation } from '@angular/router';
import { Experiencia } from 'src/app/class/experiencia.class';
import { Role } from 'src/app/enums/role.enum';
import { ExperienciaService } from 'src/app/services/experiencia.service';
import { Valid } from 'src/app/services/feat/Valid';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-experiencia',
  templateUrl: './experiencia.component.html',
  styleUrls: ['./experiencia.component.css']
})
export class ExperienciaComponent implements OnInit {

  experienciaForm: FormGroup;

  private _loading: boolean = true;
  private _valid: Valid;
  private _experiencia: Experiencia[] = [];

  public experiencia1: Experiencia = new Experiencia();
  public experiencia2: Experiencia = new Experiencia();
  public experiencia3: Experiencia = new Experiencia();

  constructor(
    private _router: Router,
    private _formBuilder: FormBuilder,
    private _service: ExperienciaService
  ) {
    const navigation: Navigation = this._router.getCurrentNavigation();
    this._valid = navigation.extras.state?.valid;
  }

  ngOnInit(): void {

    if (this?._valid?.role != Role.Profissional || !this?._valid?.role) {
      this._router.navigateByUrl('/');
    }

    this.experienciaForm = this._formBuilder.group({
      experiencia: [false],
      observacao: [''],
      empresa1: ['', [Validators.maxLength(100)]],
      cargo1: ['', [Validators.maxLength(50)]],
      dataAdmissao1: [''],
      dataDemissao1: [''],
      empresa2: ['', [Validators.maxLength(100)]],
      cargo2: ['', [Validators.maxLength(50)]],
      dataAdmissao2: [''],
      dataDemissao2: [''],
      empresa3: ['', [Validators.maxLength(100)]],
      cargo3: ['', [Validators.maxLength(50)]],
      dataAdmissao3: [''],
      dataDemissao3: [''],
    });

  }

  onSubmit() {
    this._loading = true;

    if (this.experienciaForm.value.experiencia) {

      this.experiencia1.posicao = 1;
      this.experiencia2.posicao = 2;
      this.experiencia3.posicao = 3;

      this.experiencia1.observacao = this.experienciaForm.value.observacao;
      this.experiencia2.observacao = this.experienciaForm.value.observacao;
      this.experiencia3.observacao = this.experienciaForm.value.observacao;

      this.experiencia1.empresa = this.experienciaForm.value.empresa1;
      this.experiencia2.empresa = this.experienciaForm.value.empresa2;
      this.experiencia3.empresa = this.experienciaForm.value.empresa3;

      this.experiencia1.cargo = this.experienciaForm.value.cargo1;
      this.experiencia2.cargo = this.experienciaForm.value.cargo2;
      this.experiencia3.cargo = this.experienciaForm.value.cargo3;

      this.experiencia1.dataAdmissao = this.experienciaForm.value.dataAdmissao1;
      this.experiencia2.dataAdmissao = this.experienciaForm.value.dataAdmissao2;
      this.experiencia3.dataAdmissao = this.experienciaForm.value.dataAdmissao3;

      this.experiencia1.dataDemissao = this.experienciaForm.value.dataDemissao1;
      this.experiencia2.dataDemissao = this.experienciaForm.value.dataDemissao2;
      this.experiencia3.dataDemissao = this.experienciaForm.value.dataDemissao3;

      this.experiencia1.profissionalId = this._valid.id;
      this.experiencia2.profissionalId = this._valid.id;
      this.experiencia3.profissionalId = this._valid.id;

      this._experiencia.push(this.experiencia1);
      this._experiencia.push(this.experiencia2);
      this._experiencia.push(this.experiencia3);

      this._service.save(this._experiencia).subscribe(response => {
        setTimeout(() => {
          this._router.navigateByUrl(`cadastro/profissionais/${this._valid.id}/escolaridade`, {
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

}
