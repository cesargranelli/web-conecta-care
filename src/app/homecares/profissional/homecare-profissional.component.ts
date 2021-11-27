import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProfissionalService } from 'src/app/services/profissional.service';
import { SharedLoadingService } from 'src/app/shared/services/shared-loading.service';
import { validCpf } from 'src/app/shared/validations/directives/valid-cpf.directive';
import Swal from 'sweetalert2';
import { ProfissionalCompleto } from '../classes/profissional-completo.class';
import { ProfissionalPesquisa } from '../classes/profissional-pesquisa.class';

declare var jQuery: any;

declare function carregarTarjaAzul(): void; //Carrega a funcao carregarTarjaAzul() do app.js
declare function hideToolTip(): void; //Carrega a funcao hideToolTip() do app.js
declare function injetaToolTip(): void; //Carrega a funcao injetaToolTip() do app.js

@Component({
  selector: 'app-tratamento',
  templateUrl: './homecare-profissional.component.html',
  styleUrls: ['./homecare-profissional.component.css']
})
export class HomecareProfissionalComponent implements OnInit {

  profissionalCompletoForm: FormGroup;
  profissionalCompleto: ProfissionalCompleto;
  hideProfissionalCompletoForm: boolean = true;

  profissionalPesquisaForm: FormGroup;
  profissionalPesquisa: ProfissionalPesquisa[];
  cpfEscolhido: string = "";
  hideProfissionalPesquisaForm: boolean = true;

  constructor(
    private formBuilder: FormBuilder,
    private loading: SharedLoadingService,
    private profissionalService: ProfissionalService
  ) {
    this.profissionalCompletoForm = this.formBuilder.group({
      profissionalCpf: [null, [Validators.required, validCpf(true)]],
    });
    this.profissionalPesquisaForm = this.formBuilder.group({
      nome: [null, [Validators.required]],
      cpf: [null]
    });
    jQuery('html').removeClass('nav-open');
    jQuery('button').removeClass('toggled');
  }

  ngOnInit(): void {
    carregarTarjaAzul();
    injetaToolTip();
  }

  pesquisarProfissionalPorCpf(profissionalCpf: string): any {
    this.hideProfissionalCompletoForm = true;
    this.loading.emitChange(true);
    this.profissionalService.consultarProfissionalCompletoPorCpf(profissionalCpf)
      .subscribe((profissionalCompleto: any) => {
        if (profissionalCompleto) {
          this.profissionalCompleto = profissionalCompleto?.body?.data;



          if (this.profissionalCompleto.carreira.areasAtendimento.length > 1) {
            var areaAtendimentoConcatenado = this.profissionalCompleto.carreira.areasAtendimento[0].nome;
            for (var i = 1; i < this.profissionalCompleto.carreira.areasAtendimento.length; i++) {
              areaAtendimentoConcatenado += ", " + this.profissionalCompleto.carreira.areasAtendimento[i].nome;
            }
            this.profissionalCompleto.carreira.areasAtendimento[0].nome = areaAtendimentoConcatenado;
          }



          console.log(this.profissionalCompleto);
          this.hideProfissionalCompletoForm = false;
        } else {
          this.showSwal('Profissional não localizado', 'info');
        }
      },
        (error: HttpErrorResponse) => {
          if (error.status == 404) {
            this.showSwal('Profissional não cadastrado na plataforma', 'error');
          } else {
            this.showSwal(error.message, 'error');
          }
          this.loading.emitChange(false)
        },
        () => this.loading.emitChange(false)
      );
  }

  pesquisarProfissionalPorNome(nome: string): any {
    this.hideProfissionalPesquisaForm = true;
    this.loading.emitChange(true);
    this.profissionalService.consultarProfissionalPorNome(nome)
      .subscribe((profissionalPesquisa: any) => {
        if (profissionalPesquisa) {
          this.profissionalPesquisa = profissionalPesquisa?.body?.data;

          console.log(this.profissionalPesquisa);

          this.hideProfissionalPesquisaForm = false;
        } else {
          this.showSwal('Profissional não localizado', 'info');
        }
      },
        (error: HttpErrorResponse) => {
          if (error.status == 404) {
            this.showSwal('Não há nenhum profissional com esse nome cadastrado na plataforma!', 'error');
          } else {
            this.showSwal(error.message, 'error');
          }
          this.loading.emitChange(false)
        },
        () => {
          setTimeout(() => {
            jQuery(`select[id='cpf']`).selectpicker('refresh');
            jQuery(`select[id='cpf']`).selectpicker('val', this.profissionalPesquisa?.cpf);
            this.loading.emitChange(false);
          });
        }
      );
  }

  buscaProfissional() {
    console.log(this.profissionalPesquisaForm.controls.cpf.value);
    this.pesquisarProfissionalPorCpf(this.profissionalPesquisaForm.controls?.cpf.value);
  }

  private showSwal(title: string, icon: any) {
    Swal.fire({
      position: 'center',
      icon: icon,
      title: title,
      showConfirmButton: true,
    });
  }

}
