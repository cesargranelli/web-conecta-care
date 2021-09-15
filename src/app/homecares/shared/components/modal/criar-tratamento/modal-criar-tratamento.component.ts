import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PacienteService } from 'src/app/homecares/services/paciente.service';
import { Paciente } from 'src/app/pacientes/classes/paciente.class';
import { SharedLoadingService } from 'src/app/shared/services/shared-loading.service';
import Swal from 'sweetalert2';

declare var jQuery: any;

declare function carregarTarjaAzul(): void; //Carrega a funcao carregarTarjaAzul() do app.js

@Component({
  selector: 'app-modal-criar-tratamento',
  templateUrl: './modal-criar-tratamento.component.html',
  styleUrls: ['./modal-criar-tratamento.component.css'],
})
export class ModalCriarTratamentoComponent implements OnInit {
  public criarTratamentoForm: FormGroup;
  public placeHolder = 'Digite o nome';
  public opcaoSelecionada: number;
  private userInput: string;

  constructor(
    private formBuilder: FormBuilder,
    private pacienteService: PacienteService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private loading: SharedLoadingService
  ) {
    this.criarTratamentoForm = this.formBuilder.group({
      input: [null],
    });
  }

  ngOnInit(): void {
    carregarTarjaAzul();
  }

  selecionarOpcao(opcao: number): void {
    this.opcaoSelecionada = opcao;

    switch (opcao) {
      case 1:
        this.placeHolder = 'Digite o CPF';
        break;
      default:
        this.placeHolder = 'Digite o nome';
        break;
    }
  }

  procurar(): void {
    this.loading.emitChange(true);
    this.userInput = this.criarTratamentoForm.value.input;
    switch (this.opcaoSelecionada) {
      case 0:
        this.pacienteService.consultarPorNome(this.userInput).subscribe((paciente) => {
          this.redirecionamento(paciente);
        }, null);
        break;
      case 1:
        this.pacienteService.consultarPorDocumento(this.userInput).subscribe((paciente) => {
          this.redirecionamento(paciente);
        }, null);
        break;
    }
  }

  private redirecionamento(paciente: Paciente) {
    this.loading.emitChange(false);
    jQuery('.mat-typography.modal-open').removeClass();
    jQuery('div.modal-backdrop.fade.show').remove();
    if (paciente) {
      Swal.fire({
        position: 'center',
        icon: 'info',
        title: 'Paciente já possui tratamento em andamento',
        showConfirmButton: true,
      });
      this.router.navigate([`../prontuario/${paciente.id}`], { relativeTo: this.activatedRoute });
    } else {
      Swal.fire({
        position: 'center',
        icon: 'info',
        title: 'Paciente ainda não possui tratamento em andamento',
        showConfirmButton: true,
      });
      this.router.navigate([`tratamento/solicitacao`], { relativeTo: this.activatedRoute });
    }
  }

}
