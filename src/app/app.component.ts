import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { pipe } from 'rxjs';
import { map } from 'rxjs/operators';
import { Post } from './post.model';
import { PostsService } from './posts.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  loadedPosts = [];
  isFetching = false;

  constructor(private http: HttpClient, private postsService: PostsService) { }

  ngOnInit() {
    this.isFetching = true
    this.postsService.fetchPosts().subscribe(posts => {
      this.isFetching = false;
      this.loadedPosts = posts;
    });
  }

  onCreatePost(postData: Post) {
    // Send Http request
    this.postsService.createandStorePost(postData.title, postData.content, postData.id);
    console.log(postData);

  }

  onFetchPosts() {
    // Send Http request
    this.isFetching = true
    this.postsService.fetchPosts().subscribe(posts => {
      this.isFetching = false;
      this.loadedPosts = posts;
    });

  }

  onClearPosts() {
    // Send Http request
    this.postsService.clearPost().subscribe(
      () => {
        console.dir("delted post" + this.postsService.clearPost())
        this.loadedPosts = [];
        console.log('posts has been deleted');
      }
    )


   


}
 onDeletePost(id) {
   this.postsService.deletePost(id).subscribe (
    () => {
      this.loadedPosts = this.loadedPosts.filter(post => post.id !== id);
          // this.loadedPosts = [];

    }
   )
}

}