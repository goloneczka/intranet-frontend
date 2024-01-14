import { Component, Input } from '@angular/core';
import { DailyPost } from 'src/app/model/post';
import { LocalStorageService } from 'src/app/service/local-storage.service';

@Component({
  selector: 'app-display-daily-post',
  templateUrl: './display-daily-post.component.html',
  styleUrl: './display-daily-post.component.css'
})
export class DisplayDailyPostComponent {

  @Input()
  dailyPost!: DailyPost

  today = new Date();

  isUserAuthenticated: boolean = LocalStorageService.isAuthenticated();

}
