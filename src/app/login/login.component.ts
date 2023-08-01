import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import {HttpClient, HttpParams  , HttpHeaders} from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap  } from 'rxjs/operators';
import { AuthServiceService } from '../services/auth-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  showLoader: boolean = false;
  Message: any;
  alert: any;
  newObj : {message: string} | any = {message : ""}
  
  username = ""
  password = ""

  constructor(
    private router: Router,
    private http: HttpClient,
    private authService: AuthServiceService
  ) { }

  ngOnInit(): void {
    
  }

  checkEmpty(val: string):boolean{
    if(val.length == 0) return false;
    else return true;
  }

  logUser(){
    this.showLoader = true;
    if(this.checkEmpty(this.username) && this.checkEmpty(this.password)){
      let body = {
        userName: this.username,
        password: this.password
      }
      let op = {
        headers: new HttpHeaders().set('Content-Type', 'application/json')
      };


      let data = this.http.post("https://social-app-test-9dhdw.ondigitalocean.app/public/login" ,body ,op)
      .toPromise().then(value => {
        this.newObj = value;
        console.log(this.newObj.token);
        if(this.newObj.token !== undefined){
          localStorage.setItem('token' , this.newObj.token);
          localStorage.setItem('userPublicId' , this.newObj.userPublicId);
          this.authService.login()
          this.router.navigate(['home'])
        }
      }).catch(err => {
        this.alert = err.status === 404 ? 'Invalid Credential' : 'Internal Server Error';
        this.showLoader = false;
      }).then(anothererr => console.log(anothererr))
    }
  }
  
  changeRoute(){
    this.router.navigate(['signup']);
    console.log("clicked")
  }


}
