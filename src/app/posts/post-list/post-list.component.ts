import {Component, OnDestroy, OnInit} from '@angular/core';
import {Post} from '../post.model';
import {PostService} from '../post.service';
import {Subscription} from 'rxjs';
import {PageEvent} from '@angular/material';


@Component ({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit , OnDestroy {
QAs;
SUMs;
totalposts = 20 ;
pageper = 10;
pageop = [1,2,5,10];
currentpage = 1 ;
posts: Post[] = [];
private QASub: Subscription;
private SUMSub: Subscription;
 constructor(public postService: PostService) {}
 ngOnInit() {

   this.postService.getPosts();
   this.SUMSub = this.postService.getSUMsUpdateListener().subscribe(posts => {
     console.log(posts)
     this.SUMs = posts;

   });
   this.QASub = this.postService.getQAsUpdateListener().subscribe(posts => {
     console.log(posts)
     this.QAs = posts;
   });

 }
 onChangedPage(pageData: PageEvent) {
   this.currentpage = pageData.pageIndex + 1;
   this.pageper = pageData.pageSize;
   this.postService.getPosts();
   console.log(pageData);
 }
  onDelete(postId: string) {
   console.log("onDelete");
    this.postService.deletePost(postId);
  }

  ngOnDestroy(){
   this.QASub.unsubscribe();
   this.SUMSub.unsubscribe();
}
}
