import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SharedLoadingService } from 'src/app/shared/services/shared-loading.service';
import { SharedValidService } from 'src/app/shared/services/shared-valid.service';
import { TratamentoAberto } from '../../classes/tratamento-aberto.class';

declare var jQuery: any;

@Component({
  selector: 'app-tratamento-lista-em-aberto',
  templateUrl: './tratamento-lista-em-aberto.component.html',
  styleUrls: ['./tratamento-lista-em-aberto.component.css']
})
export class TratamentoListaEmAbertoComponent implements OnInit {

  hideForm: boolean = true;

  tratamentosEmAberto = [
    { id: 1, descricao: 'Descrição do tratamento', nomePaciente: 'Nome Sobrenome1' },
    { id: 2, descricao: 'Descrição do tratamento', nomePaciente: 'Nome Sobrenome2' },
    { id: 3, descricao: 'Descrição do tratamento', nomePaciente: 'Nome Sobrenome3' },
    { id: 4, descricao: 'Descrição do tratamento', nomePaciente: 'Nome Sobrenome4' },
    { id: 5, descricao: 'Descrição do tratamento', nomePaciente: 'Nome Sobrenome5' },
    { id: 6, descricao: 'Descrição do tratamento', nomePaciente: 'Nome Sobrenome6' },
    { id: 7, descricao: 'Descrição do tratamento', nomePaciente: 'Nome Sobrenome7' },
    { id: 8, descricao: 'Descrição do tratamento', nomePaciente: 'Nome Sobrenome8' },
    { id: 9, descricao: 'Descrição do tratamento', nomePaciente: 'Nome Sobrenome9' },
    { id: 10, descricao: 'Descrição do tratamento', nomePaciente: 'Nome Sobrenome10' },
    { id: 11, descricao: 'Descrição do tratamento', nomePaciente: 'Nome Sobrenome11' },
    { id: 12, descricao: 'Descrição do tratamento', nomePaciente: 'Nome Sobrenome12' },
  ];

  constructor(
    private formBuilder: FormBuilder,
    private validService: SharedValidService,
    private loading: SharedLoadingService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    // this.idProfissional = Number(this._activeRoute.snapshot.paramMap.get('id'));
    // this._profissionalService.listarEventos(this.idProfissional).pipe(
    //   map(response => {
    //     this._loading.emitChange(true);
    //     this.eventosFuturos = response.body.data;
    //   })
    // ).subscribe(
    //   null, null, () => {
    //     setTimeout(() => {
          this.inicializarDataTable();
      //     this._loading.emitChange(false);
      //     this.escondeTabela = false;
      //   });
      // });
  }

  onSubmit() {
  }

  inicializarDataTable() {
    jQuery(document).ready(function() {
      jQuery('#datatables').DataTable({
        'pagingType': 'full_numbers',
        'lengthMenu': [
          [10, 25, 50, -1],
          [10, 25, 50, 'All']
        ],
        responsive: true,
        language: {
          search: '_INPUT_',
          searchPlaceholder: 'Pesquisar',
          lengthMenu: 'Mostrar _MENU_',
          info: 'Mostrando _START_ à _END_ de _TOTAL_ registros'
        }
      });
    });
  }

}
