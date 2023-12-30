import { Component, Input, SimpleChanges } from '@angular/core';
import { Subscription } from 'rxjs';
import { Duty, DutyToAccept, DutyType } from 'src/app/model/duty';
import { DutyService } from 'src/app/service';
import { DutyEventService } from 'src/app/service/duty-event.service';

@Component({
  selector: 'app-dail-duty-list',
  templateUrl: './dail-duty-list.component.html',
  styleUrls: ['./dail-duty-list.component.css']
})
export class DailDutyListComponent {

  duties: Duty[] = [];

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
    this.dutyService.getDuties(this.day).subscribe(dutyData => {
      this.duties = dutyData;
    });
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

}
