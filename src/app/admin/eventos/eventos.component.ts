import { AfterContentInit, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { SharedLoadingService } from 'src/app/shared/services/shared-loading.service';
import { EventoService } from './services/evento.service';

declare var jQuery: any;

@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.component.html',
  styleUrls: ['./eventos.component.css']
})
export class EventosComponent implements OnInit, AfterContentInit {
  @Output() loadingEvent = new EventEmitter<boolean>();

  public escondeTabela: boolean = true;

  constructor(
    private _loading: SharedLoadingService,
    private _eventoService: EventoService
  ) { }

  ngOnInit(): void {
    // this._eventoService.().pipe(
    //   map(response => {
    //     this._loading.emitChange(true);
    //     this.estados = response.body;
    //   }),
    //   concatMap(() => this._dominioService.getAreasAtendimento().pipe(
    //     map(response => {
    //       this.areasAtendimento = response.body;
    //     }))
    //   )
    // ).subscribe(() => {
    //   setTimeout(() => {
    //     jQuery(`select[id='estado']`).selectpicker('refresh');
    //     jQuery(`select[id='areaAtendimento']`).selectpicker('refresh');
    //     this._loading.emitChange(false);
    //     this.escondeFormulario = false;
    //   });
    // }, () => {
    //   this._loading.emitChange(false);
    // });
  }

  ngAfterContentInit() {
    jQuery(document).ready(function() {
      jQuery('#datatables').DataTable({
        "pagingType": "full_numbers",
        "lengthMenu": [
          [10, 25, 50, -1],
          [10, 25, 50, "All"]
        ],
        responsive: true,
        language: {
          search: "_INPUT_",
          searchPlaceholder: "Search records",
        }
      });

      var table = jQuery('#datatable').DataTable();

      // Edit record
      table.on('click', '.edit', function() {
        let tr = jQuery(this).closest('tr');
        var data = table.row(tr).data();
        alert('You press on Row: ' + data[0] + ' ' + data[1] + ' ' + data[2] + '\'s row.');
      });

      // Delete a record
      table.on('click', '.remove', function(event: any) {
        let tr = jQuery(this).closest('tr');
        table.row(tr).remove().draw();
        event.preventDefault();
      });

      //Like record
      table.on('click', '.like', function() {
        alert('You clicked on Like button');
      });
    });
  }

}
