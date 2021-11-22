import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SharedLoadingService } from 'src/app/shared/services/shared-loading.service';
import { SharedValidService } from 'src/app/shared/services/shared-valid.service';
import { TratamentoAbertoLista } from '../../classes/tratamento-aberto-lista.class';
import { TratamentoService } from '../../services/tratamento.service';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { DominioService } from 'src/app/services/dominio.service';
import { AreaAtendimento } from 'src/app/classes/area-atendimento.class';
import { concatMap, map } from 'rxjs/operators';

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

  constructor(
    private formBuilder: FormBuilder,
    private _dominioService: DominioService,
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

    this.previewFilterForm = this.formBuilder.group({
      cpfProfissional: [null],
      cpfPaciente: [null],
      periodoDe: [null],
      periodoAte: [null],
      areaAtendimento: [null],
      statusAtendimento: [null],
      homeCare: [null],
    });
  
    jQuery('.datetimepicker').datetimepicker({
      format: 'DD/MM/YYYY',
      maxDate: new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() - 1)
    });
    
    //
    this.carregarAreasAtendimento();
  }

  carregarAreasAtendimento() {

    this._dominioService.getAreasAtendimento()
      .pipe(map(response => {
        console.log(response.body);
        this.areasAtendimento = response.body;
        //this.tratamentosEmAberto = tratamentos;
        //this.inicializarDataTable();
        //this.loading.emitChange(false);
        //this.hideForm = false;
      })
      ).subscribe(null, null, () => {
        setTimeout(() => {
          jQuery(`select[id='areaAtendimento']`).selectpicker('refresh');
          //jQuery(`select[id='especialidade']`).selectpicker('val', this._cadastro.planoSaude?.especialidades);
          //this.carregarEspecialidades();
          //this._loading.emitChange(false);
          //this.hideForm = false;
        });        
      }
    );
  }
  navigation(tratamentoId: number, pacienteId: number) {
    /*
    this.router.navigate([tratamentoId], {
      relativeTo: this.activatedRoute,
      state: {
        pacienteId: pacienteId
      }
    });
    */
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
    console.log(control);
    console.log(name);
    jQuery(`#${name}`).on('dp.change', function(event: any) {
      control.setValue(event?.date?._d?.toLocaleDateString());
    });
  }

}
