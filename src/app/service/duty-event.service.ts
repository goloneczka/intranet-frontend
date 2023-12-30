import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Duty, DutyToAccept } from '../model/duty';

@Injectable({
  providedIn: 'root'
})
export class DutyEventService {

  private messageSource = new BehaviorSubject<DutyToAccept | null>(null); // Initial value is an empty string

  sendMessageDutyIsResolved(message: DutyToAccept) {
    this.messageSource.next(message);
  }

  getMessage(): Observable<DutyToAccept | null> {
    return this.messageSource.asObservable();
  }

  shouldForceRenderDuties(message : DutyToAccept, date : Date){
    const messageDate = new Date(message.dutyDay);
    messageDate.setHours(0,0,0,0);

    const dateToCompare = new Date(date);
    dateToCompare.setHours(0,0,0,0);
    
    return dateToCompare.getTime() === messageDate.getTime() && message.acceptance;
  }

  shouldForceRenderDutiesBeetwenDates(message : DutyToAccept, dateStart : Date, dateEnd : Date){
    const messageDate = new Date(message.dutyDay);

    return messageDate >= dateStart && messageDate <= dateEnd && message.acceptance;
  }
  
}
