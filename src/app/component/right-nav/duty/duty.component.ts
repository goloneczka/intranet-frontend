import {Component} from '@angular/core';
import {map, Observable, of} from "rxjs";
import {Duty} from "../../../model/duty";
import {DutyService} from "../../../service/duty.service";

@Component({
  selector: 'app-duty',
  templateUrl: './duty.component.html',
  styleUrls: ['./duty.component.css']
})
export class DutyComponent {

  duties$: Observable<Duty[]> = of([]);
  dutyTypes: Set<string> = new Set<string>();

  constructor(private dutyService: DutyService) { }

  ngOnInit(): void {
    this.duties$ = this.dutyService.getDuties();
    this.duties$.subscribe(duties => {
      duties.forEach(it => this.dutyTypes.add(it.dutyType))
    })
  }

}
