import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeEventService {

  private messageEmployeeSource = new BehaviorSubject<{operation: string} | null >(null); // Initial value is an empty string

  private sendMessageEmployee(operation: string) {
    this.messageEmployeeSource.next({ operation: operation});
  }

  sendMessageEmployeeTeamEdited() {
    this.sendMessageEmployee('EDIT');
  }

  sendMessageEmployeeTeamDelete() {
    this.sendMessageEmployee( 'DELETED');
  }

  sendMessageEmployeeDelete() {
    this.sendMessageEmployee( 'DELETED');
  }

  getMessage(): Observable<{operation: string} | null> {
    return this.messageEmployeeSource.asObservable();
  }
  
}
