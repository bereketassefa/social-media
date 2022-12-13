import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  users = [
    {
      name: "beki",
      age: 12
    },
    {
      name: "tsi",
      age: 12
    },
    {
      name: "abe",
      age: 12
    },
  ]

  

  constructor(private http: HttpClient) { }

  getUsers(){
    return this.users;
  }

    getPost(){
      // return this.http.get("assets/test.json");
      return this.http.get("http://localhost:8080/posts/1");
    }


  addUser(){
    this.users.push({name:"second" , age: 12});
    console.log(this.users)
    console.log("new change")
  }
}
