import {Injectable} from "@angular/core";
import {environment} from "../../environment/environment";
import {HttpClient, HttpParams} from "@angular/common/http";
import {DailyPost, Post, PostEvent, PostToSave} from "../model/post";

@Injectable()
export class PostService {
  
  private POST_URL = environment.API_URL + '/post';
  private POST_EVENT_URL = environment.API_URL + '/post-events';
  private DAILY_POST_URL = environment.API_URL + '/daily-post';
  private COUNT_POST = environment.API_URL + '/count-post';

  constructor(private http: HttpClient) {}

  getPosts(page: number, size: number) {
    const queryParams = new HttpParams().append('page', page).append('size', size);
    return this.http.get<Post[]>(this.POST_URL, {params: queryParams});
  }

  getPost(title: string) {
    return this.http.get<Post>(`${this.POST_URL}/${title}`);
  }

  getDailyPost() {
    return this.http.get<DailyPost>(this.DAILY_POST_URL);
  }

  getPostsEvent() {
    return this.http.get<PostEvent[]>(this.POST_EVENT_URL);
  }

  savePost(post: PostToSave) {
    return this.http.post<number>(this.POST_URL, post);
  }

  deletePost(title: string) {
    const queryParams = new HttpParams().append('title', title);
    return this.http.delete<number>(this.POST_URL, {params: queryParams});
  }

  editPost(title: string, post: PostToSave) {
    const queryParams = new HttpParams().append('title', title);
    return this.http.put<number>(this.POST_URL, post, {params: queryParams});
  }
 
  countAllAvaiablePosts() {
    return this.http.get<number>(this.COUNT_POST);
  }

}
