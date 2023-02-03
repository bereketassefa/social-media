import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../user';
import { catchError, map, tap  } from 'rxjs/operators';
import { of } from 'rxjs';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  firstName: string = ""
  lastName: string = ""
  password: string = ""
  email: string = ""
  phoneNumber: string = ""
  alert:string = ""
  Message:any = ""

  constructor(
    private router: Router,
    private http: HttpClient
  ) { }

  ngOnInit(): void {
  }

  value = ""
  changeRoute(){
    this.router.navigate(['login']);
    console.log("clicked")
  }

  checkEmpty(val: string):boolean{
    if(val.length == 0) return false;
    else return true;
  }

  showconsole(){
    console.log("form logged")
  }


  signUser(){
    // console.log("first and last name" ,this.firstName + this.lastName) 
    // console.log("password" , this.password) 
    // console.log("email" , this.email) 
    // console.log("phone no" , this.phoneNumber)
    // if(this.checkEmpty(this.firstName + this.lastName) && this.checkEmpty(this.password) && this.checkEmpty(this.email) && this.checkEmpty(this.phoneNumber) ){
      // console.log("button clicked")
      // let body = new URLSearchParams();
      // body.set("firstName", "firstnamelastname",)
      // body.set("lastName", "email@email.com",)
      // body.set("password", "berket",)
      // body.set("phoneNumber", "0989898989")
      let op = {
        // headers: new HttpHeaders().set('Content-Type', 'application/json')
        headers: new HttpHeaders().set('Content-Type', 'application/json')
      };


      let data = this.http.post("http://localhost:8001/public" ,
      
      {
        firstName: this.firstName,
        lastName: this.lastName,
        userName: this.email, 
        password: this.password,
        phoneNumber: this.phoneNumber
      }
      // {
      //   "firstName":"bereket",
      //   "lastName": "assef",
      //   "userName": "assefa@gmail.com",
      //   "password":"passcode",
      //   "phoneNumber" : "0909090909"
      // }
      ,op)
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
            console.log("expected data" , this.Message.message)
            if(!(this.Message.id == undefined)) {
              this.router.navigate(['login']);
              // localStorage.setItem('token', this.Message.token);
            }
          }

    )
    }
  }