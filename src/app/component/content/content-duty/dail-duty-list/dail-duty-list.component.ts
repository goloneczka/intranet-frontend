import { Component, Input, SimpleChanges } from '@angular/core';
import { Subscription } from 'rxjs';
import { Duty, DutyListInType, DutyParam, DutyToAccept, DutyType } from 'src/app/model/duty';
import { DutyService } from 'src/app/service';
import { DutyEventService } from 'src/app/service/event/duty-event.service';

@Component({
  selector: 'app-dail-duty-list',
  templateUrl: './dail-duty-list.component.html',
  styleUrls: ['./dail-duty-list.component.css']
})
export class DailDutyListComponent {

  duties: DutyListInType[] = [];

  @Input()
  dutyTypes: DutyType[] = [];

  @Input()
  day: Date = new Date();

  @Input()
  dutyParam: DutyParam = {hoursEnd: '00:00', hoursStart: '00:00'};

  subscription!: Subscription;

  constructor(private dutyEventService: DutyEventService,  private dutyService: DutyService) {}
  
  ngOnInit(): void {
    this.prepareDutyForDay();
    this.subscription = this.dutyEventService.getMessage().subscribe((message : DutyToAccept | null) => {
      if(message && this.dutyEventService.shouldForceRenderDuties(message, this.day)){        
        this.prepareDutyForDay();
      }
    });
  }

  ngOnChanges(_: SimpleChanges): void {
    if(this.day && this.dutyParam && this.dutyTypes){
      this.prepareDutyForDay();
    }
  }

  prepareDutyForDay() {
    const [paramStartHour, paramStartMinute, paramsStartSecond] = new String(this.dutyParam?.hoursStart).split(':').map(Number);
    const [paramEndHour, paramEndMinute, paramsEndSecond] = new String(this.dutyParam?.hoursEnd).split(':').map(Number);
    const hoursOfWholeWorkDay : number = (paramEndHour - paramStartHour) * 60;

    this.dutyService.getDuties(this.day).subscribe(dutyData => {

      this.duties = this.dutyTypes.map(it => {
        const singleRow = {dutyType: it, dutyList: new Array(), fulfill: 0};

        dutyData.filter(n_it => n_it.dutyType.type === it.type).forEach(n_it => {
          singleRow.dutyList.push(n_it);
          const [startHour, startMinute] = new String(n_it.startTime).split(':').map(Number);
          const [endHour, endMinute] = new String(n_it.endTime).split(':').map(Number);
          singleRow.fulfill += ((endHour * 60 + endMinute) - (startHour * 60 + startMinute)) / hoursOfWholeWorkDay * 100;
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
