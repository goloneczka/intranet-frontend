import { Component, Inject, ViewEncapsulation } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Post } from 'src/app/model/post';

@Component({
  selector: 'app-display-post-dialog',
  templateUrl: './display-post-dialog.component.html',
  styleUrl: './display-post-dialog.component.css',
  encapsulation: ViewEncapsulation.None
})
export class DisplayPostDialogComponent {

  postToDisplay: Post;

  constructor(@Inject(MAT_DIALOG_DATA) private post: Post) {
    this.postToDisplay = post;
  }

}
