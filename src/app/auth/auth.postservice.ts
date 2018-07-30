import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {st} from '@angular/core/src/render3';
import {Subject} from 'rxjs';
import {Route, Router, Routes} from '@angular/router';

@Injectable({providedIn: 'root'})
export class UserService {
  private username:string;
  private token: string ;
  private tokentimer: any;
  private isAuthenticated = false;
  private loginstatus = new Subject<boolean>();
  constructor(private http: HttpClient , private router: Router) {}
  getisauth(){
    return this.isAuthenticated;
  }
  getUsername(){
    return this.username
  }

  getToken() {
    return this.token;
  }
  getLoginStatusListener() {
    return this.loginstatus.asObservable();
  }
  CreateUser(email: string , password: string ,firstname: string, lastname: string){
    const user = {firstName: firstname, lastName: lastname ,username: email , password: password };
    console.log(user);
    this.http.post("http://localhost:5000/signup/" , user).subscribe(response => {
      console.log("http post signup içi aşağıda posttan gelen cevap olmalı")
    console.log(response);
    });
  }
  login(email: string , password: string ) {

    const user = {username: email , password: password };
    console.log(user);
    this.http.post<{username:string ,token: string }>("http://localhost:5000/login/" , user).subscribe(response => {
      const token = response.token;
      console.log("login response");
      console.log(response)
      const username = response.username;


      this.token = token ;
      this.username = username;
      if (token) {
        this.isAuthenticated = true;
        this.loginstatus.next(true);


        this.saveAuthData(token, username );
        this.router.navigate(['/create']);
      }
    });

  }
  logout() {
    console.log("authservice logout")
    this.token = null;
    this.isAuthenticated = false;
    this.loginstatus.next(false);

    console.log(this.getAuthData());
    this.clearAuthData();
    console.log(this.getAuthData);
    this.router.navigate(['/login']);
  }

   autoAuth(){
    const authInfo = this.getAuthData();
    if(!authInfo){
      return;
    }
     this.token = authInfo.token;
    this.username = authInfo.username;
     this.isAuthenticated = true;
     this.loginstatus.next(true);

  }

  private saveAuthData(token: string,username:string ){
    localStorage.setItem('token ', token );
    localStorage.setItem('username ', username );


  }
  private clearAuthData(){
    localStorage.removeItem('token');
    localStorage.removeItem('username');


  }
  private getAuthData(){
    const token = localStorage.getItem('token ');
    const username =  localStorage.getItem('username ');

    if(!token){
      return;
      }
    return {
      token: token,
      username: username

    };
  }
}
