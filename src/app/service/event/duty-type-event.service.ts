import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { DutyType, DutyTypeMessage } from '../../model/duty';

@Injectable({
  providedIn: 'root'
})
export class DutyTypeEventService {

  private messageSource = new BehaviorSubject<DutyTypeMessage | null>(null); // Initial value is an empty string

  private sendMessageDutyType(message: DutyType, operation: string) {
    this.messageSource.next({dutyType: message, operation: operation});
  }

  sendMessageDutyTypeDeleted(dutyType: DutyType) {
    this.sendMessageDutyType(dutyType, 'DELETED');
  }

  sendMessageDutyTypeEdited(dutyType: DutyType) {
    this.sendMessageDutyType(dutyType, 'EDIT');
  }

  sendMessageDutyTypeAdded(dutyType: DutyType) {
    this.sendMessageDutyType(dutyType, 'ADD');
  }

  getMessage(): Observable<DutyTypeMessage | null> {
    return this.messageSource.asObservable();
  }
}
