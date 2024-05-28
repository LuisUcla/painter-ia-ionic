import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Post } from '../models/post.model';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  constructor(private http: HttpClient) { }

  getPosts() {
    return this.http.get(environment.baseUrl + environment.posts)
  }

  createPosts(post: Post) {
    return this.http.post(environment.baseUrl + environment.posts, post);
  }
}
