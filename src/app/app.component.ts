import {Component, OnInit} from '@angular/core';
import { Post } from './posts/post.model';
import {UserService} from './auth/auth.postservice';
@Component({
  selector: 'app-root1',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  implements OnInit {
  constructor(private authService: UserService) {}

  ngOnInit(){
    this.authService.autoAuth();
  }

}
