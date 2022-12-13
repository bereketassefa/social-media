import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import {HttpClient, HttpParams  , HttpHeaders} from '@angular/common/http';
import { of } from 'rxjs';
import { catchError, map, tap  } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  Message: any;
  alert: any;
  
  username = ""
  password = ""

  constructor(
    private router: Router,
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    
  }

  checkEmpty(val: string):boolean{
    if(val.length == 0) return false;
    else return true;
  }

  logUser(){
    if(this.checkEmpty(this.username) && this.checkEmpty(this.password)){
      let body = new URLSearchParams();
      body.set('userName', this.username);
      body.set('password', this.password);
      let op = {
        headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
      };


      let data = this.http.post("http://localhost:8080/public/login" ,body.toString() ,op)
      .pipe(
        catchError((error ) => {
          if (error.status == 404){
            this.alert = "Invalid Credential";
          }
          return of([]);
        } 
      )
      );
      data.subscribe(
        data => {
          this.Message = data ; 
            console.log(this.Message.message)
            if(!(this.Message.message == undefined)) {
              this.router.navigate(['signup']);
              localStorage.setItem('token', this.Message.token);
            }
          }

    )
    
      
    }
  }
  
  changeRoute(){
    this.router.navigate(['signup']);
    console.log("clicked")
  }


}
