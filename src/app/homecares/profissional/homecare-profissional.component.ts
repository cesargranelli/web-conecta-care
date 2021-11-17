import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProfissionalService } from 'src/app/services/profissional.service';
import { SharedLoadingService } from 'src/app/shared/services/shared-loading.service';
import { validCpf } from 'src/app/shared/validations/directives/valid-cpf.directive';
import Swal from 'sweetalert2';
import { ProfissionalCompleto } from '../classes/profissional-completo.class';

declare var jQuery: any;

@Component({
  selector: 'app-tratamento',
  templateUrl: './homecare-profissional.component.html',
  styleUrls: ['./homecare-profissional.component.css']
})
export class HomecareProfissionalComponent implements OnInit {

  profissionalCompletoForm: FormGroup;

  profissionalCompleto: ProfissionalCompleto;

  hideForm: boolean = true;

  constructor(
    private formBuilder: FormBuilder,
    private loading: SharedLoadingService,
    private profissionalService: ProfissionalService
  ) {
    this.profissionalCompletoForm = this.formBuilder.group({
      profissionalCpf: [null, [Validators.required, validCpf(true)]],
    });

  }

  ngOnInit(): void {
  }

  pesquisarProfissional(profissionalCpf: string): any {
    this.hideForm = true;
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
          this.hideForm = false;
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

  private showSwal(title: string, icon: any) {
    Swal.fire({
      position: 'center',
      icon: icon,
      title: title,
      showConfirmButton: true,
    });
  }

}
