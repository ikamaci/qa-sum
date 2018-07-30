import {Component, OnDestroy, OnInit} from '@angular/core';
import {UserService} from '../auth/auth.postservice';
import {Subscription} from 'rxjs';
@Component({
  selector: 'app-header',
  templateUrl : './header.component.html',
  styleUrls: ['./header.component.css']

})
export class HeaderComponent implements OnInit , OnDestroy  {
  constructor(private authservice: UserService){}
  private authsubs: Subscription;
   isauth = false;
   username;
  ngOnInit(){
    this.isauth = this.authservice.getisauth();
    this.authsubs = this.authservice.getLoginStatusListener().subscribe(answer => {
      this.isauth = answer;
      this.username = this.authservice.getUsername()
    })
  }
  onLogout() {
    console.log("onlog");
    this.authservice.logout();
  }
  ngOnDestroy(){
    this.authsubs.unsubscribe();
  }
}
