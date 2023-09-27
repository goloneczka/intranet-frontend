import { Component } from '@angular/core';
import {Observable, of} from "rxjs";
import {Post} from "../../../model/post";
import {PostService} from "../../../service/post.service";

@Component({
  selector: 'app-content-home',
  templateUrl: './content-home.component.html',
  styleUrls: ['./content-home.component.css']
})
export class ContentHomeComponent {

  posts$: Observable<Post[]> = of([]);

  constructor(private postService: PostService) { }

  ngOnInit(): void {
    this.posts$ = this.postService.getPosts()
  }

}
