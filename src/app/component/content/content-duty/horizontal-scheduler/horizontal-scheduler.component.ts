import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { CalendarDay, Duty, DutyToAccept, DutyType } from 'src/app/model/duty';
import { DutyService } from 'src/app/service';
import { DutyEventService } from 'src/app/service/event/duty-event.service';

const WEEKEND_DAYS = ['SOB', 'NIEDZ'];

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
        name: startDate.toLocaleDateString('pl-PL', { weekday: 'short' }).replace(/\.$/, '')
      });
      startDate.setDate(startDate.getDate() + 1);
    }
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
    this.currentDate.setDate(day.dayOfMonth);
    this.currentDayEvent.emit(new Date(this.currentDate));
  }

  shouldDisableCursor(index : number, resource: DutyType) {
      const indexedDate = new Date(this.currentDate);
      indexedDate.setDate(index+2);
      return indexedDate < new Date() || this.isTotalDutyAssigned({dayOfMonth: index+1, name: ''}, resource);
  }

  isWeekend(index : number) {
    const indexedDateNumber = index+1;
    const dayOfMonth = this.days.find(it => it.dayOfMonth === indexedDateNumber)?.name || '';
    return WEEKEND_DAYS.includes(dayOfMonth.toUpperCase());
  }

  isToday(index : number){
    const today = new Date();
    const indexedDateNumber = index+1;

    return indexedDateNumber === today.getDate() &&
      today.getMonth() === this.currentDate.getMonth() &&
      today.getFullYear() === this.currentDate.getFullYear() 
  }

  toggleEvent(day: CalendarDay, resource: DutyType) {
    const date = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), day.dayOfMonth);
    const now = new Date();
    now.setHours(0,0,0,0);
    if(date >= now && !this.isTotalDutyAssigned(day, resource)){
      this.newDutyEvent.emit({ resource: resource.type, date: date});
    }
  }

  showPreviousMonth() {
    const newDate = this.currentDate.setMonth(
      this.currentDate.getMonth() - 1,
      this.getProperDayOfMonth(this.currentDate.getFullYear(), this.currentDate.getMonth() - 1)
    );
    this.updateMonthDisplay(newDate);
  }

  showNextMonth() {
    const newDate = this.currentDate.setMonth(
      this.currentDate.getMonth() + 1,
      this.getProperDayOfMonth(this.currentDate.getFullYear(), this.currentDate.getMonth() + 1)
    );
    this.updateMonthDisplay(newDate);
  }

  currentMonth() {
    this.updateMonthDisplay();
  }

  private prepareDutiesForMonth(date : Date) {
    this.dutyService.getDutiesForMonth(date).subscribe(dutyData => {
      this.duties = dutyData;
    });
  }

  private updateMonthDisplay(date? : number) {
    this.currentDate = date ? new Date(date) : new Date();
    this.prepareDutiesForMonth(this.currentDate);
    this.currentDayEvent.emit(this.currentDate);
    this.generateCalendar();
  }

  private getProperDayOfMonth(year: number, month: number): number {
    const firstDayOfNextMonth = new Date(year, month + 1, 1);
    const lastDayOfMonth = new Date(firstDayOfNextMonth.getTime() - 1);
  
    return this.currentDate.getDate() > lastDayOfMonth.getDate() ? lastDayOfMonth.getDate() : this.currentDate.getDate() ;
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

}
