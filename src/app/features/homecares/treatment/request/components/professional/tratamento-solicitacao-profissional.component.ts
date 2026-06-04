import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgxMaskDirective, NgxMaskPipe } from 'ngx-mask';

import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Especialidade } from 'src/app/core/models/especialidade.class';
import { Profissional } from 'src/app/core/models/profissional.class';
import { ProfissionalAtendimento } from 'src/app/features/homecares/models/profissional-atendimento.model';
import { ProfissionalService } from 'src/app/core/services/profissional.service';
import { SharedLoadingService } from 'src/app/shared/services/shared-loading.service';
import Swal from 'sweetalert2';

@Component({
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, RouterModule, NgxMaskDirective, NgxMaskPipe],
  selector: 'app-tratamento-solicitacao-profissional',
  templateUrl: './tratamento-solicitacao-profissional.component.html',
  styleUrls: ['./tratamento-solicitacao-profissional.component.css']
})
export class TratamentoSolicitacaoProfissionalComponent implements OnInit {

  @Input()
  tratamentoForm: FormGroup;

  @Output()
  eventoProfissional = new EventEmitter<Profissional>();

  profissional: ProfissionalAtendimento;

  constructor(
    private loading: SharedLoadingService,
    private profissionalService: ProfissionalService
  ) { }

  ngOnInit(): void {
  }

  pesquisarProfissional(profissionalCpf: string): any {
    this.profissional = null;
    this.loading.emitChange(true);
    this.profissionalService.pesquisarPorCpf(profissionalCpf)
      .subscribe((profissional: Profissional) => {
        if (profissional) {
          this.eventoProfissional.emit(profissional);
          this.profissionalService.pesquisarPorId(String(profissional.id))
            .subscribe((profissionalAtendmento: ProfissionalAtendimento) => {
              if (profissional) {
                this.profissional = profissionalAtendmento;
              } else {
                this.showSwal('Profissional não localizado', 'info');
              }
            });
        } else {
          this.showSwal('Profissional não localizado', 'info');
        }
      },
        (error: Error) => this.showSwal(error.message, 'error'),
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

  especialidades(especialidades: Especialidade[]): any {
    if (!!especialidades)
      return especialidades?.map(especialidade => especialidade?.nome);
    return '';
  }

}

