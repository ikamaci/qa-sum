import {Component} from '@angular/core';
import {NgForm} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {UserService} from '../auth.postservice';


@Component({
 templateUrl: './login.component.html',
 styleUrls: ['./login.component.css']
})


export class LoginComponent{
    constructor(public userService: UserService) {}



onLogin(form: NgForm){
    if(form.invalid){
      return;
    }
    console.log(form.value);
    this.userService.login(form.value.email , form.value.password);
}


}
