import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { PacienteService } from 'src/app/homecares/services/paciente.service';
import { ActivatedRoute } from '@angular/router';
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
    private loadingService: SharedLoadingService
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
    this.loadingService.emitChange(true);
    this.userInput = this.criarTratamentoForm.value.input;
    switch (this.opcaoSelecionada) {
      case 1:
        this.pacienteService
          .consultarPorDocumento(this.userInput)
          .subscribe((paciente) => {
            this.loadingService.emitChange(false);
            setTimeout(() => {
              this.router.navigate([`../prontuario/${paciente.id}`], {
                relativeTo: this.activatedRoute,
              });
            });
          });
        break;
      default:
        this.pacienteService
          .consultarPorNome(this.userInput)
          .subscribe((paciente) => {
            this.router.navigate([`../prontuario/${paciente.id}`], {
              relativeTo: this.activatedRoute,
            });
          });
    }
  }
}
