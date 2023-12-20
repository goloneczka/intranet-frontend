import { Component, Input } from '@angular/core';
import { Duty, DutyType } from 'src/app/model/duty';

@Component({
  selector: 'app-dail-duty-list',
  templateUrl: './dail-duty-list.component.html',
  styleUrls: ['./dail-duty-list.component.css']
})
export class DailDutyListComponent {

  @Input()
  duties: Duty[] = [];

  @Input()
  dutyTypes: DutyType[] = [];
  
}
