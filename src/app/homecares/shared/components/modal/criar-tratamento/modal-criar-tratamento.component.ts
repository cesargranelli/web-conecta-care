import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { PacienteService } from 'src/app/homecares/services/paciente.service';

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
    private pacienteService: PacienteService
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
    this.userInput = this.criarTratamentoForm.value.input;

    switch (this.opcaoSelecionada) {
      case 1:
        console.log('decumento');
        
        this.pacienteService
          .consultarPorDocumento(this.userInput)
          .subscribe((paciente) => {
            console.log(paciente);
          });
        break;
      default:
        console.log('noem');
        this.pacienteService
          .consultarPorNome(this.userInput)
          .subscribe((paciente) => {
            console.log(paciente);
          });
    }
  }
}
