import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthServiceService } from '../services/auth-service.service';
import {HttpClient, HttpParams  , HttpHeaders} from '@angular/common/http';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  showAlert = false;
  postData = "This is the first post"
  imageURLs: string[] = ["https://images.unsplash.com/photo-1585409677983-0f6c41ca9c3b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1169&q=80"]
  showLoader = false

  constructor(
    private authService: AuthServiceService,
    private router : Router,
    private http: HttpClient,
  ) { }

  ngOnInit(): void {
  }


  logout(){
    // this.authService.logout()
    // this.router.navigate(['login'])
    console.log("logout button clicked")
  }
  addURL(event:string){
    this.imageURLs.push(event)
    console.log("from parent" , this.imageURLs)
    this.showLoader = false;
  }

  showData(){
    console.log(this.postData , this.imageURLs)
  }
  logUser(){
      // let body = new URLSearchParams();
      // body.set('content', "");
      // body.set('password', "");
      let thepostdata = {
        content:this.postData,
        appUser: {
          token: localStorage.getItem("token")
        },
        postImages:
          this.imageURLs.map((each , index) => {
            return {
              id: index,
              imageUrl: each
            }
          })
        ,
      }
      let op = {
        headers: new HttpHeaders().set('Content-Type', 'application/json')
      };

      console.log(thepostdata)
      let data = this.http.post("http://localhost:8008/posts" ,JSON.stringify(thepostdata) ,op)
      .toPromise().then(value => {
        console.log(value)
      }).catch(err => {
        console.log("there is an error adding post")
      })
    }
  }