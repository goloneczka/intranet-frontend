import {Component} from '@angular/core';
import {map, Observable, of} from "rxjs";
import {Duty, DutyType} from "../../../model/duty";
import {DutyService} from "../../../service/duty.service";

@Component({
  selector: 'app-duty',
  templateUrl: './duty.component.html',
  styleUrls: ['./duty.component.css']
})
export class DutyComponent {

  duties: Duty[] = [];
  dutyTypes: DutyType[] = [];

  constructor(private dutyService: DutyService) { }

  ngOnInit(): void {
    this.dutyService.getDutyTypes().subscribe(typesData => {
      this.dutyTypes = typesData;
      this.dutyService.getDuties(new Date()).subscribe(dutyData => {
        this.duties = dutyData;
      });
    });
  }

}
