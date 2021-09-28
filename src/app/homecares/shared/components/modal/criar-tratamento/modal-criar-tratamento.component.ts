import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TratamentoAberto } from 'src/app/homecares/classes/tratamento-aberto.class';
import { PacienteService } from 'src/app/homecares/services/paciente.service';
import { TratamentoService } from 'src/app/homecares/services/tratamento.service';
import { Paciente } from 'src/app/pacientes/classes/paciente.class';
import { SharedLoadingService } from 'src/app/shared/services/shared-loading.service';
import { SharedValidService } from 'src/app/shared/services/shared-valid.service';
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
  public placeHolder = 'Digite o CPF';
  public opcaoSelecionada: number = 1;
  private userInput: string;

  constructor(
    private formBuilder: FormBuilder,
    private sharedValidService: SharedValidService,
    private pacienteService: PacienteService,
    private tratamentoService: TratamentoService,
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
          if (paciente) {
            this.consultaTratamentoEmAberto(paciente);
          }
          this.loading.emitChange(false);
        }, () => this.loading.emitChange(false));
        break;
      case 1:
        this.pacienteService.consultarPorDocumento(this.userInput).subscribe((paciente) => {
          if (paciente) {
            this.consultaTratamentoEmAberto(paciente);
          }
          this.loading.emitChange(false);
        }, () => this.loading.emitChange(false));
        break;
    }
  }

  private consultaTratamentoEmAberto(paciente: Paciente) {
    this.tratamentoService.consultarTratamentoEmAberto(String(paciente?.id), String(this.sharedValidService.getValid()?.id))
      .subscribe(tratamentoEmAberto => {
        this.redirecionamento(tratamentoEmAberto?.body?.data);
      }, (httpErrorResponse: HttpErrorResponse) => {
        if (httpErrorResponse.error.status == 412) {
          this.redirecionamento(null);
        } else {
          Swal.fire({
            position: 'center',
            icon: 'error',
            title: 'Ops! Ocorreu um erro inexperrado',
            showConfirmButton: true,
          });
          this.loading.emitChange(false);
        }
      });
  }

  private redirecionamento(tratamentoEmAberto: TratamentoAberto) {
    this.loading.emitChange(false);
    jQuery('.mat-typography.modal-open').removeClass();
    jQuery('div.modal-backdrop.fade.show').remove();
    if (tratamentoEmAberto) {
      Swal.fire({
        position: 'center',
        icon: 'info',
        title: 'Paciente já possui tratamento em andamento',
        showConfirmButton: true,
      });
      this.router.navigate([`../prontuario/${tratamentoEmAberto?.paciente.id}`], { relativeTo: this.activatedRoute });
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
