import {Component, OnDestroy, OnInit} from '@angular/core';

import {NgForm} from '@angular/forms';
import {PostService} from '../post.service';
import {toBase64String} from '@angular/compiler/src/output/source_map';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.scss']
  }

)
export class PostCreateComponent implements OnInit, OnDestroy{
  Text;
  color="black";
  metin:string;
  paragraphs = [];
  selectedparag;
  private TextSub: Subscription;
  constructor(public postService: PostService) {
  }

    paragclicked(parag: string){
    console.log("inner Text")
    console.log(parag);
    this.selectedparag = parag;
}
hover(){
    this.color = "green";
}
  onAddPost(form: NgForm) {
    if (!form.invalid&&this.selectedparag!=null) {
      console.log(form.value)
    this.postService.postQA(this.Text.kararId,this.selectedparag, form.value.question, form.value.answer)
      form.resetForm();
    }



    }
  onAddSummary(form: NgForm) {
    if (!form.invalid) {
      this.postService.postSUM(this.Text.kararId,form.value.summary)
    }

    form.resetForm();

  }



  ngOnInit(): void {
    this.postService.fetchText();
    this.TextSub = this.postService.getTextUpdateListener().subscribe(result => {
      console.log(result)
      this.Text = result;
      this.metin = this.Text.metin;
      console.log(this.Text)
      this.paragraphs = this.metin.split(/\n\s*\n/g);
      console.log(this.paragraphs);
    });


  }
  ngOnDestroy(): void {
    this.TextSub.unsubscribe();
  }

  }
