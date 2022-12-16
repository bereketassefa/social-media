import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  x = localStorage.getItem("token");
  
  isLogedIn: boolean = this.x == undefined ? false : true;
  constructor() {
    console.log("token" , this.x)
   }


  login(){
    this.isLogedIn = true;
  }

  logout(){
    this.isLogedIn = false;
    localStorage.clear()
    console.log("logout");

  }

  updateToken(){
    let x = localStorage.getItem("token");
    this.isLogedIn = x == undefined ? false : true;

  }

  LogedIn(){
    this.updateToken()
    return this.isLogedIn;
  }
}
