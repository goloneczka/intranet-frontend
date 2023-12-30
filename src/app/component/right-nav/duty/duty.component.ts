import {Component} from '@angular/core';
import {Duty, DutyToAccept, DutyType} from "../../../model/duty";
import {DutyService} from "../../../service/duty.service";
import { DutyEventService } from 'src/app/service/duty-event.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-duty',
  templateUrl: './duty.component.html',
  styleUrls: ['./duty.component.css']
})
export class DutyComponent {

  duties: Duty[] = [];
  dutyTypes: DutyType[] = [];
  subscription!: Subscription;


  constructor(private dutyService: DutyService, private dutyEventService: DutyEventService) { }

  ngOnInit(): void {
    this.dutyService.getDutyTypes().subscribe(typesData => {
      this.dutyTypes = typesData;
      this.prepareDutyForDay();
    });
    this.subscription = this.dutyEventService.getMessage().subscribe((message : DutyToAccept | null) => {
      if(message && this.dutyEventService.shouldForceRenderDuties(message, new Date())){
        this.prepareDutyForDay();
      }
    });
  }

  prepareDutyForDay() { 
    this.dutyService.getDuties(new Date()).subscribe(dutyData => {
      this.duties = dutyData;
    });
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

}
