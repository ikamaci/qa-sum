import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Subject } from "rxjs";
import { map } from 'rxjs/operators';

import { Post } from "./post.model";

@Injectable({ providedIn: "root" })
export class PostService {
  private Qas = [];
  private Sums = [];
  private Text ;
  private posts: Post[] = [];
  private TextUpdated = new Subject();
  private QAsUpdated = new Subject();
  private SUMsUpdated = new Subject();
  private words = [];
  private paragraphs = [];
  private sentences = [];
  constructor(private http: HttpClient) {
  }
  fetchText(){
    this.http
      .get<{ kararId: string; metin: any}>(
        "http://localhost:5000/text"
      ).subscribe(response => {
        this.Text = response;
        console.log(this.Text);
        this.TextUpdated.next(this.Text)
      console.log("Text updated :")
      console.log(this.TextUpdated)

    })
  }
  getPosts() {
    /*
    console.log("This is the current page" + currentpage);
    const queryparams = `?page=${currentpage}&pagesize=${postperpage}`;
    console.log("http://localhost:5000/profile" + queryparams);
    */
    this.http
      .get<{ qa:JSON [], summary: JSON []}>(
        "http://localhost:5000/profile"
      )

      .subscribe(transformedPosts => {
        console.log("transformed post")
        console.log(transformedPosts);
        this.Qas = transformedPosts.qa;
        this.Sums = transformedPosts.summary;
       // this.posts = transformedPosts;
        this.QAsUpdated.next([...this.Qas]);
        this.SUMsUpdated.next([...this.Sums]);
      });
  }

  getTextUpdateListener() {
    return this.TextUpdated.asObservable();
  }
  getQAsUpdateListener() {
    return this.QAsUpdated.asObservable();
  }
  getSUMsUpdateListener() {
    return this.SUMsUpdated.asObservable();
  }

  postQA( kararId: string, pick: string, question: string, answer: string) {
    const qa =
      {kararId: kararId, pick: pick, question: question, answer: answer};
    console.log(qa);
    this.http
      .post<{ msg: string, status: number, user: {}}>("http://localhost:5000/qa", qa)
      .subscribe(responseData => {
        console.log("posttan gelen response");
        console.log(responseData);
        this.Qas.push(responseData);
        this.QAsUpdated.next([...this.Qas]);
      });
  }
  postSUM( kararId: string, sum: string) {
    const summary =
      {kararId: kararId, sum: sum};
    console.log(summary);
    this.http
      .post<{ msg: string, status: number, user: {}}>("http://localhost:5000/summary", summary)
      .subscribe(responseData => {
        console.log("posttan gelen response");
        console.log(responseData);
        this.Sums.push(responseData);
        this.SUMsUpdated.next([...this.Qas]);
      });
  }
  deletePost(postId: string) {
    this.http.delete("http://localhost:3000/posts/" + postId)
      .subscribe(() => {



        this.TextUpdated.next([...this.posts]);
      });
  }

  getHtml(url: string) {
    this.http.get( 'http://www.hurriyet.com.tr/gundem/izmirde-zehirlenme-panigi-sayi-2-bin-600e-ulasti-40902118')
      .subscribe(response => console.log(response));
  }
  getWords() {
    return this.words;
  }
  getParagraphs() {
    return this.paragraphs;
  }

  getQAS(){
    return this.Qas;
  }
  getSUMS(){
    return this.Sums;
  }
}
