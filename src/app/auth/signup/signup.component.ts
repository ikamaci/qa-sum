
import {Component} from '@angular/core';
import {NgForm} from '@angular/forms';
import {UserService} from '../auth.postservice';


@Component({
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  constructor(public authService: UserService) {}

onSignup(form: NgForm){

    if(form.invalid){
      console.log("Geçersiz form");
      return;
    }
    this.authService.CreateUser(form.value.email , form.value.password ,form.value.firstname, form.value.lastname );






    form.resetForm();
}

}
