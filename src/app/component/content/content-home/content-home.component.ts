import { Component, Input, ViewChild } from '@angular/core';
import {Observable, of} from "rxjs";
import {Post, PostToSave} from "../../../model/post";
import {PostService} from "../../../service/post.service";
import { LocalStorageService } from 'src/app/service/local-storage.service';
import { NewPostComponent } from './new-post/new-post.component';

@Component({
  selector: 'app-content-home',
  templateUrl: './content-home.component.html',
  styleUrls: ['./content-home.component.css']
})
export class ContentHomeComponent {

  @ViewChild(NewPostComponent)
  documentGroupChild!: NewPostComponent;

  posts$: Observable<Post[]> = of([]);
  isUserAuthenticated: boolean = LocalStorageService.isAuthenticated();

  constructor(private postService: PostService) { }

  ngOnInit(): void {
    this.posts$ = this.postService.getPosts();
  }

  addPost() {
    this.documentGroupChild.shouldDisplayForm(true);
  }

  savePost(post : PostToSave) {
    this.postService.savePost(post).subscribe(_ => {
      this.posts$ = this.postService.getPosts();
    });
  }

  openDialogEdit(post : Post) {

  }

  deletePost(post : Post) {
    
  }
}
