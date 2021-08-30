import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Profissional } from 'src/app/classes/profissional.class';
import { ProfissionalService } from 'src/app/services/profissional.service';
import { SharedLoadingService } from 'src/app/shared/services/shared-loading.service';
import Swal from 'sweetalert2';
import { ProfissionalAtendimento } from '../../classes/profissional-atendimento.class';
import { Especialidade } from 'src/app/classes/especialidade.class';

@Component({
  selector: 'app-profissional-tratamento',
  templateUrl: './profissional-tratamento.component.html',
  styleUrls: ['./profissional-tratamento.component.css']
})
export class ProfissionalTratamentoComponent implements OnInit {

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
    return especialidades?.map(especialidade => especialidade?.nome);
  }

}
