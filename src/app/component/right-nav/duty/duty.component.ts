import {Component} from '@angular/core';
import {Duty, DutyListInType, DutyToAccept, DutyType} from "../../../model/duty";
import {DutyService} from "../../../service/duty.service";
import { DutyEventService } from 'src/app/service/duty-event.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-duty',
  templateUrl: './duty.component.html',
  styleUrls: ['./duty.component.css']
})
export class DutyComponent {

  duties: DutyListInType[] = [];
  dutyTypes: DutyType[] = [];
  subscription!: Subscription;
  today: Date = new Date();


  constructor(private dutyService: DutyService, private dutyEventService: DutyEventService) { }

  ngOnInit(): void {
    this.dutyService.getDutyTypes().subscribe(typesData => {
      this.dutyTypes = typesData;
      this.prepareDutyForDay();
    });

    this.subscription = this.dutyEventService.getMessage().subscribe((message : DutyToAccept | null) => {
      if(message && this.dutyEventService.shouldForceRenderDuties(message, this.today)){
        this.prepareDutyForDay();
      }
    });
  }

  prepareDutyForDay() { 
    const hoursOfWholeWorkDay : number = 13;

    this.dutyService.getDuties(this.today).subscribe(dutyData => {

      this.duties = this.dutyTypes.map(it => {
        const singleRow = {dutyType: it, dutyList: new Array(), fulfill: 0};

        dutyData.filter(n_it => n_it.dutyType.type === it.type).forEach(n_it => {
          singleRow.dutyList.push(n_it);
          const [startHour, startMinute] = new String(n_it.startTime).split(':').map(Number);
          const [endHour, endMinute] = new String(n_it.endTime).split(':').map(Number);
          singleRow.fulfill += ((endHour * 60 + endMinute) - (startHour * 60 + startMinute)) / (hoursOfWholeWorkDay * 60) * 100;
        });
        return singleRow;
      });
    });
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

}
