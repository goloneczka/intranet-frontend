import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SocialMediaEventService {

  private messageSource = new BehaviorSubject<{operation: string} | null >(null); // Initial value is an empty string

  private sendMessageEmployee(operation: string) {
    this.messageSource.next({ operation: operation});
  }

  sendMessageSocialMediaEdited() {
    this.sendMessageEmployee('UPDATE');
  }

  getMessage(): Observable<{operation: string} | null> {
    return this.messageSource.asObservable();
  }

  
}
