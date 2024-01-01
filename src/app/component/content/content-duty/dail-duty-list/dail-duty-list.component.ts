import { Component, Input, SimpleChanges } from '@angular/core';
import { Subscription } from 'rxjs';
import { Duty, DutyListInType, DutyToAccept, DutyType } from 'src/app/model/duty';
import { DutyService } from 'src/app/service';
import { DutyEventService } from 'src/app/service/duty-event.service';

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
    this.prepareDutyForDay();
  }

  prepareDutyForDay() {
    const hoursOfWholeWorkDay : number = 13;

    this.dutyService.getDuties(this.day).subscribe(dutyData => {

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
