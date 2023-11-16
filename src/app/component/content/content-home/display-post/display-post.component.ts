import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Post } from 'src/app/model/post';

@Component({
  selector: 'app-display-post',
  templateUrl: './display-post.component.html',
  styleUrls: ['./display-post.component.css']
})
export class DisplayPostComponent {

  @Input() card!: Post
  @Input() isUserAuthenticated: boolean = false;

  @Output() editEvent = new EventEmitter<boolean>();
  @Output() deleteEvent = new EventEmitter<Post>();

  sendEditEvent() {
    this.editEvent.emit(true);
  }


  deletePost() {
    this.deleteEvent.emit(this.card);
  }
}
