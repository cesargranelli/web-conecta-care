import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SharedLoadingService } from 'src/app/shared/services/shared-loading.service';
import { SharedValidService } from 'src/app/shared/services/shared-valid.service';
import { TratamentoAbertoLista } from '../../classes/tratamento-aberto-lista.class';
import { TratamentoService } from '../../services/tratamento.service';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { DominioService } from 'src/app/services/dominio.service';
import { AreaAtendimento } from 'src/app/classes/area-atendimento.class';
import { StatusAtendimento } from 'src/app/classes/status-atendimento.class';
import { HomecareService } from 'src/app/homecares/services/homecare.service';
import { AtendimentoService } from 'src/app/homecares/services/atendimento.service';
import { HomeCare } from 'src/app/homecares/classes/homecare.class';
import { AtendimentoPreview } from 'src/app/homecares/classes/atendimento-preview.class';
import { concatMap, map } from 'rxjs/operators';
import { i18nMetaToJSDoc } from '@angular/compiler/src/render3/view/i18n/meta';

import Swal from 'sweetalert2';

declare var jQuery: any;

@Component({
  selector: 'app-tratamento-preview',
  templateUrl: './tratamento-preview.component.html',
  styleUrls: ['./tratamento-preview.component.css']
})
export class TratamentoPreviewComponent implements OnInit {

  //hideForm: boolean = true;
  //tratamentosEmAberto: Array<TratamentoAbertoLista>;
  public previewFilterForm: FormGroup;  
  public areasAtendimento: AreaAtendimento[];
  public statusAtendimento: StatusAtendimento[];
  public atendimentosPreview: AtendimentoPreview[];
  public homesCares: HomeCare[];

  constructor(
    private formBuilder: FormBuilder,
    private _dominioService: DominioService,
    private _homeCareService: HomecareService,
    private _atendimentoService: AtendimentoService
    //private validService: SharedValidService,
    //private loading: SharedLoadingService,
    //private tratamentoService: TratamentoService,
    //private router: Router,
    //private activatedRoute: ActivatedRoute
  ) {
    //this.loading.emitChange(true);

  }

  ngOnInit(): void {
    /*
    this.tratamentoService.listarTratamentoEmAberto(String(this.validService.getValid()?.id))
      .subscribe(tratamentos => {
        this.tratamentosEmAberto = tratamentos;
        this.inicializarDataTable();
        this.loading.emitChange(false);
        this.hideForm = false;
      },
        () => this.loading.emitChange(false),
        () => this.loading.emitChange(false)
      );
    */

    //
    this.limparFiltros();
    //
    this.carregarAreasAtendimento();
  }

  carregarAreasAtendimento() {

    this._dominioService.getAreasAtendimento()
      .pipe(map(response => {
        this.areasAtendimento = response.body;
      }),
      concatMap(() => this._dominioService.getStatusAtendimento().pipe(map(response => this.statusAtendimento = response.body))),
      concatMap(() => this._homeCareService.getAll().pipe(map(response => this.homesCares = response.body.data)))
      ).subscribe(null, null, () => {
        setTimeout(() => {
          jQuery(`select[id='areaAtendimento']`).selectpicker('refresh');
          jQuery(`select[id='statusAtendimento']`).selectpicker('refresh');
          jQuery(`select[id='homeCare']`).selectpicker('refresh');          
        });        
      }
    );
  }

  inicializarDataTable() {
    jQuery(document).ready(function () {
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

  dateChange(control: FormControl, name: string) {
    jQuery(`#${name}`).on('dp.change', function(event: any) {
      control.setValue(event?.date?._d?.toLocaleDateString());
    });
  }

  consultarPreview() {
    console.log('consultarPreview');
    console.log(this.previewFilterForm);


    if (this.previewFilterForm.valid) {

      this._atendimentoService.consultarPreview(
          this.previewFilterForm.value.cpfProfissional || null,
          this.previewFilterForm.value.cpfPaciente || null,
          this.previewFilterForm.value.periodoDe || null,
          this.previewFilterForm.value.periodoAte || null,
          this.previewFilterForm.value.areaAtendimento || null,
          this.previewFilterForm.value.statusAtendimento || null,
          this.previewFilterForm.value.homeCare || null
          )
        .subscribe(atendimentos => {
          this.atendimentosPreview = atendimentos.body.data;
          this.inicializarDataTable();
        });
      } else {
        Swal.fire({
          position: 'center',
          icon: 'warning',
          title: 'Preencha os campos obrigatórios!',
          showConfirmButton: true
        });

      }
  }

  limparFiltros() {

    let dataAtual = new Date();
    let dataDe = new Date();
    dataDe.setDate(dataDe.getDate() - 15);

    let dataAte = new Date();
    dataAte.setDate(dataAte.getDate() + 30);

    this.previewFilterForm = this.formBuilder.group({
      cpfProfissional: [null],
      cpfPaciente: [null],
      periodoDe: [this.formatDate(dataDe), [Validators.required]],
      periodoAte: [this.formatDate(dataAte), [Validators.required]],
      areaAtendimento: [null],
      statusAtendimento: [null],
      homeCare: [null,  [Validators.required]],
    });

    jQuery('.datetimepicker').datetimepicker({
      format: 'DD/MM/YYYY',
      maxDate: new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() - 1)
    });

    setTimeout(() => {
      jQuery(`select[id='areaAtendimento']`).selectpicker('refresh');
      jQuery(`select[id='statusAtendimento']`).selectpicker('refresh');
      jQuery(`select[id='homeCare']`).selectpicker('refresh');          
    });        

  }

  formatDate(date?: Date) {
    if (date == null) {
      return null;
    }

    if (date.toString().length === 10) {
      const strDate = date.toString();
      date = new Date(strDate);
    }
    return `${this.paddy(date.getDate(), 2, '0')}//${this.paddy(date.getMonth() + 1, 2, '0')}/${date.getFullYear()}`;
  }

  paddy(num: number, padlen: number, padchar: string) {
    const pad_char = typeof padchar !== 'undefined' ? padchar : '0';
    const pad = new Array(1 + padlen).join(pad_char);
    return (pad + num).slice(-pad.length);
  }
  
}
