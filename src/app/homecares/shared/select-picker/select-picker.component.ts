import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

declare var jQuery: any;

@Component({
  selector: 'app-select-picker',
  templateUrl: './select-picker.component.html',
  styleUrls: ['./select-picker.component.css']
})
export class SelectPickerComponent implements OnInit {

  @Input()
  public selectId: string;

  @Output()
  public selectValue: EventEmitter<any> = new EventEmitter<any>();

  constructor() {
  }

  ngOnInit(): void {
    jQuery('select').selectpicker('render');
    setTimeout(() => {
      jQuery('select').selectpicker('refresh');
    });
  }

  emit(): void {
    // jQuery("select[id=" + this.selectId +"]").val();
    // console.log(jQuery('select[id=' + this.selectId + ']').val());
    this.selectValue.emit(jQuery('select[id=' + this.selectId + ']').val());
  }


}
