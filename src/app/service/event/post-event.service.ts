import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Post, PostToSave, PostToSaveMessage } from 'src/app/model/post';

@Injectable({
  providedIn: 'root'
})
export class PostEventService {

  private messageSource = new BehaviorSubject<PostToSaveMessage | null>(null); // Initial value is an empty string

  private sendMessagePostToSave(message: PostToSave | Post, operation: string) {
    this.messageSource.next({postToSave: message, operation: operation});
  }

  getMessage(): Observable<PostToSaveMessage | null> {
    return this.messageSource.asObservable();
  }

  sendMessagePostToSavedDeleted(post: Post) {
    this.sendMessagePostToSave(post, 'DELETE');
  }

  sendMessageDutyTypeEdited(postToSave: PostToSave) {
    this.sendMessagePostToSave(postToSave, 'EDIT');
  }

  sendMessagePostToSaveAdded(postToSave: PostToSave) {
    this.sendMessagePostToSave(postToSave, 'ADD');
  }

  shouldForceRenderPostsEvent(message : PostToSaveMessage) : boolean{
    const checkingDate = new Date(message.postToSave.eventDate);
    const now = new Date();
    checkingDate.setHours(0,0,0,0);

    return message.operation === 'EDIT' || (
      (message.operation === 'ADD' || message.operation === 'DELETE') && (
       new Date(now.getFullYear(), now.getMonth(), 1) <= checkingDate &&
       new Date(now.getFullYear(), now.getMonth() + 1, 0) >= checkingDate
       )
    );
  }
}
