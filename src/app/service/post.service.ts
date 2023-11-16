import {Injectable} from "@angular/core";
import {environment} from "../../environment/environment";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Post, PostToSave} from "../model/post";

@Injectable()
export class PostService {
  
  private POST_URL = environment.API_URL + '/post';

  constructor(private http: HttpClient) {}

  public getPosts() {
    const queryParams = new HttpParams().append('page', 0).append('size', 10);
    return this.http.get<Post[]>(this.POST_URL, {params: queryParams});
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
 

}
