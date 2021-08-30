import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PacienteService } from 'src/app/homecares/services/paciente.service';
import { SharedLoadingService } from 'src/app/shared/services/shared-loading.service';

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
          if (paciente) {
            this.router.navigate([`../prontuario/${paciente.id}`], { relativeTo: this.activatedRoute });
          }
        }, null, () => {
          this.loading.emitChange(false);
          jQuery('.mat-typography.modal-open').removeClass();
          jQuery('div.modal-backdrop.fade.show').remove();
        });
        break;
      case 1:
        this.pacienteService.consultarPorDocumento(this.userInput).subscribe((paciente) => {
          if (paciente) {
            this.router.navigate([`../prontuario/${paciente.id}`], { relativeTo: this.activatedRoute });
          }
        }, null, () => {
          this.loading.emitChange(false);
          jQuery('.mat-typography.modal-open').removeClass();
          jQuery('div.modal-backdrop.fade.show').remove();
        });
        break;
      default:
        jQuery('.mat-typography.modal-open').removeClass();
        jQuery('div.modal-backdrop.fade.show').remove();
        this.router.navigate([`tratamento/solicitacao`], { relativeTo: this.activatedRoute });
        this.loading.emitChange(false);
    }
    jQuery('.mat-typography.modal-open').removeClass();
    jQuery('div.modal-backdrop.fade.show').remove();
    this.router.navigate([`tratamento/solicitacao`], { relativeTo: this.activatedRoute });
    this.loading.emitChange(false);
  }
}
