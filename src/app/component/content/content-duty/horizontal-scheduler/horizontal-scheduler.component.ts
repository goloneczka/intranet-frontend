import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CalendarDay, Duty, DutyType } from 'src/app/model/duty';

@Component({
  selector: 'app-horizontal-scheduler',
  templateUrl: './horizontal-scheduler.component.html',
  styleUrls: ['./horizontal-scheduler.component.css']
})
export class HorizontalSchedulerComponent {

  days: CalendarDay[] = [];

  @Input()
  resources: DutyType[] = [];

  @Input()
  duties: Duty[] = [];

  currentDate: Date = new Date();
  @Output() 
  currentDateEvent = new EventEmitter<Date>();

  currentDayNumber: number = new Date().getDate();
  @Output() 
  currentDayEvent = new EventEmitter<Date>();

  ngOnInit() {
    this.generateCalendar();
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

  toggleEvent(day: string, resource: DutyType) {
    console.log(`Toggle event for ${day} at ${resource}`);
  }

  showPreviousMonth() {
    const newDate = this.currentDate.setMonth(this.currentDate.getMonth() - 1);
    this.currentDate = new Date(newDate);
    this.currentDateEvent.emit(this.currentDate);
    this.currentDayEvent.emit(new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), this.currentDayNumber));
    this.generateCalendar();
  }

  showNextMonth() {
    const newDate = this.currentDate.setMonth(this.currentDate.getMonth() + 1);
    this.currentDate = new Date(newDate);
    this.currentDateEvent.emit(this.currentDate);
    this.currentDayEvent.emit(new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), this.currentDayNumber));
    this.generateCalendar();
  }

  currentMonth() {
    this.currentDate = new Date();
    this.currentDateEvent.emit(this.currentDate);
    this.currentDayEvent.emit(this.currentDate);
    this.generateCalendar();
  }
}
