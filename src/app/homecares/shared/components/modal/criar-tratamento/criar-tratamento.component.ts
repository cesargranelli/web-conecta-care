import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';

declare var jQuery: any;

declare function carregarTarjaAzul(): void; //Carrega a funcao carregarTarjaAzul() do app.js

@Component({
    selector: 'app-criar-tratamento',
    templateUrl: './criar-tratamento.component.html',
    styleUrls: ['./criar-tratamento.component.css']
})
export class CriarTratamentoComponent implements OnInit {

    public criarTratamentoForm: FormGroup;
    public placeHolder = 'Digite o nome';
    public opcaoSelecionada: number;

    constructor(private formBuilder: FormBuilder) {
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
            case 0:
                this.placeHolder = 'Digite o nome';
                break;
            case 1:
                this.placeHolder = 'Digite o CPF';
                break;
        }
    }

}
