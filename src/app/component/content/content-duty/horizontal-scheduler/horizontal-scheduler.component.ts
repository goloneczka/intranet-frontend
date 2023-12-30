import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { CalendarDay, Duty, DutyToAccept, DutyType } from 'src/app/model/duty';
import { DutyService } from 'src/app/service';
import { DutyEventService } from 'src/app/service/duty-event.service';

@Component({
  selector: 'app-horizontal-scheduler',
  templateUrl: './horizontal-scheduler.component.html',
  styleUrls: ['./horizontal-scheduler.component.css']
})
export class HorizontalSchedulerComponent {

  days: CalendarDay[] = [];

  @Input()
  resources: DutyType[] = [];

  duties: Duty[] = [];

  currentDate: Date = new Date();

  currentDayNumber: number = new Date().getDate();
  @Output() 
  currentDayEvent = new EventEmitter<Date>();

  @Output() 
  newDutyEvent = new EventEmitter();

  subscription!: Subscription;

  constructor( private dutyService: DutyService, private dutyEventService : DutyEventService) {}

  ngOnInit() {
    this.generateCalendar();
    this.prepareDutiesForMonth(this.currentDate);

    this.subscription = this.dutyEventService.getMessage().subscribe((message : DutyToAccept | null) => {
      if(message && this.dutyEventService.shouldForceRenderDutiesBeetwenDates(message,
              new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), 1),
              new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() + 1, 0)
        )){        
        this.prepareDutiesForMonth(this.currentDate);
      }
    });
  }

  private generateCalendar() {
    const startDate = new Date(this.currentDate);
    startDate.setDate(1); // Set to the first day of the month

    const endDate = new Date(startDate);
    endDate.setMonth(startDate.getMonth() + 1);
    endDate.setDate(0); // Set to the last day of the current month

    this.days = [];
    while (startDate <= endDate) {
      this.days.push({
        dayOfMonth: startDate.getDate(),
        name: startDate.toLocaleDateString('en-US', { weekday: 'short' })
      });
      startDate.setDate(startDate.getDate() + 1);
    }
  }

  private prepareDutiesForMonth(date : Date) {
    this.dutyService.getDutiesForMonth(date).subscribe(dutyData => {
      this.duties = dutyData;
    });
  }

  hasDuty(day: CalendarDay, resource: DutyType): boolean {
    return this.duties.some(apiDuty => {
      const apiDutyDay = new Date(apiDuty.dutyDay);
      return apiDutyDay.getDate() === day.dayOfMonth &&
             apiDutyDay.getMonth() === this.currentDate.getMonth() &&
             apiDutyDay.getFullYear() === this.currentDate.getFullYear() &&
             apiDuty.dutyType.type === resource.type;
    });
  }

  isTotalDutyAssigned(day: CalendarDay, resource: DutyType): boolean {
    const hoursOfWholeWorkDay : number = 13;
    return this.duties.filter(apiDuty => {
      const apiDutyDay = new Date(apiDuty.dutyDay);
      return apiDutyDay.getDate() === day.dayOfMonth &&
             apiDutyDay.getMonth() === this.currentDate.getMonth() &&
             apiDutyDay.getFullYear() === this.currentDate.getFullYear() &&
             apiDuty.dutyType.type === resource.type;
    }).reduce((sum, curIt) => {
        const [startHour, startMinute] = new String(curIt.startTime).split(':').map(Number);
        const [endHour, endMinute] = new String(curIt.endTime).split(':').map(Number);
        return sum + (endHour * 60 + endMinute) - (startHour * 60 + startMinute);
      }, 0) === hoursOfWholeWorkDay * 60;
  }

  toggleDay(day: CalendarDay) {
    this.currentDayNumber = day.dayOfMonth;
    this.currentDayEvent.emit(new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), day.dayOfMonth));
  }

  shouldDisableCursor(index : number, resource: DutyType) {
      const indexedDate = new Date(this.currentDate);
      indexedDate.setDate(index+1);
      return indexedDate < new Date() || this.isTotalDutyAssigned({dayOfMonth: index+1, name: ''}, resource);
  }

  toggleEvent(day: CalendarDay, resource: DutyType) {
    const date = this.currentDate;
    date.setDate(day.dayOfMonth);
    if(date >= new Date() && !this.isTotalDutyAssigned(day, resource)){
      this.newDutyEvent.emit({ resource: resource.type, date: date});
    }
  }

  showPreviousMonth() {
    const newDate = this.currentDate.setMonth(this.currentDate.getMonth() - 1);
    this.currentDate = new Date(newDate);
    this.prepareDutiesForMonth(this.currentDate);
    this.currentDayEvent.emit(new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), this.currentDayNumber));
    this.generateCalendar();
  }

  showNextMonth() {
    const newDate = this.currentDate.setMonth(this.currentDate.getMonth() + 1);
    this.currentDate = new Date(newDate);
    this.prepareDutiesForMonth(this.currentDate);
    this.currentDayEvent.emit(new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), this.currentDayNumber));
    this.generateCalendar();
  }

  currentMonth() {
    this.currentDate = new Date();
    this.currentDayNumber = this.currentDate.getDate();
    this.prepareDutiesForMonth(this.currentDate);
    this.currentDayEvent.emit(this.currentDate);
    this.generateCalendar();
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

}
