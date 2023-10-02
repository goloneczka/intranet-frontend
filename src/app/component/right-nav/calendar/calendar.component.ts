import { Component } from '@angular/core';
import {CustomDateFormatterImpl} from "../../../service/calendar-Date-Formatter";
import {CalendarDateFormatter} from "angular-calendar";

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css'],
  providers: [{
      provide: CalendarDateFormatter,
      useClass: CustomDateFormatterImpl
    }]
})
export class CalendarComponent {
  selectedDate: Date;

  constructor() {
    this.selectedDate = new Date();
  }

}
