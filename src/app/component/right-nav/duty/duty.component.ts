import {Component} from '@angular/core';
import {Duty, DutyListInType, DutyToAccept, DutyType, DutyTypeMessage} from "../../../model/duty";
import {DutyService} from "../../../service/duty.service";
import { DutyEventService } from 'src/app/service/event/duty-event.service';
import { Subscription } from 'rxjs';
import { DutyTypeEventService } from 'src/app/service/event/duty-type-event.service';
import { EmployeeEventService } from 'src/app/service/event/employee-event.service';

@Component({
  selector: 'app-duty',
  templateUrl: './duty.component.html',
  styleUrls: ['./duty.component.css']
})
export class DutyComponent {

  duties: DutyListInType[] = [];
  dutyTypes: DutyType[] = [];
  subscription!: Subscription;
  dutyTypeEventSubscription!: Subscription;
  empEventSubscription!: Subscription;
  today: Date = new Date();


  constructor(private dutyService: DutyService,
     private dutyEventService: DutyEventService,
     private dutyTypeEventSevice: DutyTypeEventService,
     private empEventService: EmployeeEventService) { }

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

    this.dutyTypeEventSubscription = this.dutyTypeEventSevice.getMessage().subscribe((_ : DutyTypeMessage | null) => {
      this.dutyService.getDutyTypes().subscribe(typesData => {
        this.dutyTypes = typesData;
        this.prepareDutyForDay();
      });
    });

    this.empEventSubscription = this.empEventService.getMessage().subscribe((message : {operation: string}| null) => {
      if(message?.operation === 'DELETED') {
        this.prepareDutyForDay();
      }
    });
  }

  prepareDutyForDay() { 

    this.dutyService.getDuties(this.today).subscribe(dutyData => {
      this.duties = this.dutyTypes.map(it => {
        const singleRow = {dutyType: it, dutyList: new Array(), fulfill: 0};
        dutyData.filter(n_it => n_it.dutyType.type === it.type).forEach(n_it => {
          singleRow.dutyList.push(n_it);
        });
        return singleRow;
      });
    });
  }

  ngOnDestroy() {
      this.subscription?.unsubscribe();
      this.dutyTypeEventSubscription?.unsubscribe();
      this.empEventSubscription?.unsubscribe();
  }

}
