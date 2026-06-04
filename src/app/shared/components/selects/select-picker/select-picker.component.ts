import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

declare var jQuery: any;

@Component({
  standalone: true,
  imports: [ReactiveFormsModule],
  selector: 'app-select-picker',
  templateUrl: './select-picker.component.html',
  styleUrls: ['./select-picker.component.css']
})
export class SelectPickerComponent implements OnInit {

  @Input() public selectId: string;
  @Input() public contentList: Array<any>;
  @Output() public selectValue = new EventEmitter<any>();

  ngOnInit(): void {
    jQuery('select').selectpicker('render');
    setTimeout(() => jQuery('select').selectpicker('refresh'));
  }

  emit(): void {
    this.selectValue.emit(jQuery('select[id=' + this.selectId + ']').val());
  }
}
