import {
  Component,
} from '@angular/core';
import * as _ from 'lodash';
import { IMyOptions, IMyDateModel } from 'mydatepicker';

@Component({
  selector: 'date-picker',
  templateUrl: './datepicker.component.html',
  styleUrls: ['./datepicker.component.css']
})

export class DatePickerComponent {
  public startDate;
  public endDate;
 
  public myDatePickerOptions: IMyOptions = {
    dateFormat: 'dd-mm-yyyy',
    showTodayBtn: true
  };
  constructor(
  ) { }


  public onDateChanged(event: IMyDateModel, dateType: string) {
  }
}
