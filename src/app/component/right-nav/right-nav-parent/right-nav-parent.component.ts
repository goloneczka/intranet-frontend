import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable, Subscription, map, of } from 'rxjs';
import { DailyPost, PostEvent, PostToSaveMessage } from 'src/app/model/post';
import { PostService } from 'src/app/service';
import { PostEventService } from 'src/app/service/event/post-event.service';
import { DisplayPostDialogComponent } from '../display-post-dialog/display-post-dialog.component';

@Component({
  selector: 'app-right-nav-parent',
  templateUrl: './right-nav-parent.component.html',
  styleUrls: ['./right-nav-parent.component.css']
})
export class RightNavParentComponent {

  postsEvent$: Observable<PostEvent[]>=of([]);
  calendarSubscription!: Subscription;
  events: string[] = [];
  eventsDate: Date = new Date();
  dailyPost!: DailyPost;
  today: Date = new Date();
  todayDayOfWeek: string = '';

  constructor(
    public dialog: MatDialog,
    private postService: PostService,
    private postEventService: PostEventService
 ) { }

 ngOnInit(): void {
  this.postService.getDailyPost().subscribe(data => {this.dailyPost = data});
  this.todayDayOfWeek = this.today.toLocaleDateString('pl-PL', { weekday: 'long' });
  this.postsEvent$ = this.postService.getPostsEvent();
  this.calendarSubscription = this.postEventService.getMessage().subscribe((message : PostToSaveMessage | null) => {
      if(message && this.postEventService.shouldForceRenderPostsEvent(message)){
        this.postsEvent$ = this.postService.getPostsEvent();
      }
    });
  }

  prepareEventsForDay(date: Date) {
    this.eventsDate = new Date(date);
    this.postsEvent$
      .pipe(map(data => data
        .filter(n_it => new Date(n_it.eventDate).getDate() === date.getDate())
        .map(n_it => n_it.title)
      ))
      .subscribe(data => this.events = data );
  }

  prepareNewDisplayPostDialog(postTitle: string) {
    this.postService.getPost(postTitle).subscribe(it => {
      this.dialog.open(DisplayPostDialogComponent, {
        data: it,
        minWidth: '800px',
        minHeight:'400px'
      });
    })
  }

  ngOnDestroy(): void {
    this.calendarSubscription?.unsubscribe();
  }

}
