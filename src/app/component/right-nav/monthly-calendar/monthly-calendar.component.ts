import { DatePipe } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PostEvent } from 'src/app/model/post';


@Component({
  selector: 'app-monthly-calendar',
  templateUrl: './monthly-calendar.component.html',
  styleUrl: './monthly-calendar.component.css'
})
export class MonthlyCalendarComponent {

  @Input()
  postsEvent: PostEvent[]=[];
  @Output()
  choosenDayEvent = new EventEmitter<Date>();
  
  currentMonth!: number;
  currentYear!: number;
  daysInMonth!: number;
  firstDayOfWeek!: number;
  calendarDays: number[] = [];
  highlightedRowIndex: number | null = null;
  selectedNumber: number| null = null;

  constructor(
     public datePipe: DatePipe
  ) { }

  ngOnInit(): void {
    const currentDate = new Date();
    this.currentMonth = currentDate.getMonth() + 1; // Months are 0-indexed
    this.currentYear = currentDate.getFullYear();
    this.choosenDayEvent.emit(currentDate);

    this.calculateCalendar();
  }

  calculateCalendar(): void {
    this.daysInMonth = new Date(this.currentYear, this.currentMonth, 0).getDate();
    this.firstDayOfWeek = new Date(`${this.currentYear}-${this.currentMonth}-01`).getDay();

    this.calendarDays = Array.from({ length: this.daysInMonth }, (_, i) => i + 1);
  }

  getWeeks(): {number: number, isCurrentMonth: boolean}[][] {
    const weeks: {number: number, isCurrentMonth: boolean}[][] = [];
    let currentWeek: {number: number, isCurrentMonth: boolean}[] = Array(7).fill(null);
  
    const daysFromPrevMonth = this.getDaysFromPrevMonth();
    const daysFromNextMonth = this.getDaysFromNextMonth();
  
    let dayIndex = 0;
  
    for (let i = 0; i < 6; i++) {
      for (let j = 0; j < 7; j++) {
        if (i === 0 && j < this.firstDayOfWeek -1) {
          currentWeek[j] = {number: daysFromPrevMonth[daysFromPrevMonth.length - this.firstDayOfWeek + j], isCurrentMonth: false};
        } else if (dayIndex < this.calendarDays.length) {
          currentWeek[j] = {number: this.calendarDays[dayIndex], isCurrentMonth: true};
          dayIndex++;
        } else {
          currentWeek[j] = {number: daysFromNextMonth[dayIndex - this.calendarDays.length], isCurrentMonth: false};
          dayIndex++;
        }
      }
  
      weeks.push([...currentWeek]);
      currentWeek = Array(7).fill(null);
  
      // Stop adding new rows if there are no more days to be filled
      if (dayIndex >= this.calendarDays.length && daysFromNextMonth[dayIndex - this.calendarDays.length] === undefined) {
        break;
      }
    }
  
    return weeks;
  }

  getDaysFromPrevMonth(): number[] {
    const prevMonthLastDay = new Date(this.currentYear, this.currentMonth - 1, 0).getDate();
    const daysFromPrevMonth = Array.from({ length: this.firstDayOfWeek }, (_, i) => prevMonthLastDay - (this.firstDayOfWeek - 1) + i);
    return daysFromPrevMonth;
  }

  getDaysFromNextMonth(): number[] {
    const daysFromNextMonth = Array.from({ length: 7 - (this.firstDayOfWeek -1 + this.daysInMonth) % 7 }, (_, i) => i + 1);
    return daysFromNextMonth;
  }

  isToday(day: {number: number, isCurrentMonth: boolean}): boolean {
    const today = new Date();
    return day.number === today.getDate() &&  day.isCurrentMonth;
  }

  isSelected(day: {number: number, isCurrentMonth: boolean}): boolean {
    return day.number === this.selectedNumber && day.isCurrentMonth;
  }

  chooseSelectedDay(day: {number: number, isCurrentMonth: boolean}) {
    if(day.isCurrentMonth) {
      this.selectedNumber = day.number;
      const date = new Date(this.currentYear, this.currentMonth-1, this.selectedNumber);
      this.choosenDayEvent.emit(date);
    }
  }

  hasEvents(day: {number: number, isCurrentMonth: boolean}, eventNumber: number): boolean{
    return day.isCurrentMonth && this.postsEvent
      .filter(it => new Date(it.eventDate).getDate() === day.number)
      .length >= eventNumber;
  }
}