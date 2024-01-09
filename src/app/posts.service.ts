import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Post } from './post.model';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class PostsService {

  constructor(private http: HttpClient) {}

  createandStorePost(title: string, content: string , id : string) {
    const postData: Post = { title: title, content: content  , id: id };
    this.http
      .post<{ name: string }>(
        'https://ang-backend-17416-default-rtdb.firebaseio.com/posts.json',
        postData
      )
      .subscribe((responseData) => {
        console.log(responseData);
      });
  }

  fetchPosts(): Observable<Post[]> {
    return this.http
      .get<{ [key: string]: Post; }>(
        'https://ang-backend-17416-default-rtdb.firebaseio.com/posts.json'
      ) //<>response body type]
      .pipe(
        map((responseData) => {
          const postsArray: Post[] = [];
          for (const key in responseData) {
            //coverting object to array
            if (responseData.hasOwnProperty(key)) {
              postsArray.push({ ...responseData[key], id: key });
            }
          }
          return postsArray;
        })
      );
  
  }
  
  deletePost(id:string): Observable<any>{
  let postData:any= this.http.post<any>;
 return this.http.delete<any>(`https://ang-backend-17416-default-rtdb.firebaseio.com/posts/${id}.json`)
}

clearPost(): Observable<any>{
 return this.http.delete<any>(`https://ang-backend-17416-default-rtdb.firebaseio.com/posts.json`)

}}
