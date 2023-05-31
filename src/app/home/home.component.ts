import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthServiceService } from '../services/auth-service.service';
import {HttpClient, HttpParams  , HttpHeaders} from '@angular/common/http';
import { StateService } from '../services/state.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  comment = this.state.commentState
  showAlert = false;
  postData = ""
  imageURLs : any = ["https://images.unsplash.com/photo-1585409677983-0f6c41ca9c3b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1169&q=80" , "https://images.unsplash.com/photo-1585409677983-0f6c41ca9c3b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1169&q=80"]
  showLoader = false
  postLoader = true
  allposts : any;
  posts: any = []
  postToComment : any
  commentData = ""

  constructor(
    private authService: AuthServiceService,
    private state: StateService,
    private router : Router,
    private http: HttpClient,
  ) { }

  ngOnInit(): void {
    let data = this.http.get("http://localhost:3000/public/posts" )
    .toPromise().then(postvalue => {
      this.postLoader = false;
      
      for (let key in postvalue) {
        // console.log(key, postvalue[key as keyof typeof postvalue]);
        this.posts.push(postvalue[key as keyof typeof postvalue])
      }
      // this.allposts = JSON.stringify(value)
      // console.log(postvalue[a as keyof typeof postvalue]);
      
    
    }).catch(err => {
      console.log(err)
    })
  }

  convertDate(datedate: string){
    const dateString = datedate; // format: YYYY-MM-DD
    const date = new Date(dateString);

    return date.toLocaleString('en-US', { dateStyle: "short", });
  }
  extractImage(data: any) : any[]{
    let ima = []
    for (let key in data) {
      // console.log(key, postvalue[key as keyof typeof postvalue]);
      ima.push(data[key as keyof typeof data].imageUrl)

    }
    // console.log(ima)
    return ima;
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
  Sendpost(){
      let thepostdata = {
        content:this.postData,
        postImages:
          this.imageURLs.map((each: any ) => {
            return {
              
              imageUrl: each
            }
          })
        ,
        ppId: localStorage.getItem("userPublicId")
      }
      console.log(thepostdata)
      let op = {
        headers: new HttpHeaders().set('Content-Type', 'application/json').set("userPublicId" , localStorage.getItem("userPublicId")).set("token" , localStorage.getItem("token")),
        
      };

      console.log(thepostdata)
      let data = this.http.post("http://localhost:3000/public/post" ,JSON.stringify(thepostdata) ,op)
      .toPromise().then(value => {
        console.log(value)
        this.showAlert = false;
        this.postData = "";
        this.imageURLs = []
      }).catch(err => {
        console.log("there is an error adding post")
      })
    }
    showComment(){
      this.comment = !this.comment
      console.log(this.state.commentId)
      this.http.get(`http://localhost:3000/public/posts/${this.state.postPublicId}`)
      .toPromise().then(value => {
        this.postToComment  = value
        
      }).catch(err => {
        console.log("there is an error adding post")
      })
    }
    submitComment(idnum: any){
      let data = {
        content: this.commentData,
        ppId: localStorage.getItem("userPublicId")
        }
      let op = {
        headers: new HttpHeaders().set('Content-Type', 'application/json').set("userPublicId" , localStorage.getItem("userPublicId")).set("token" , localStorage.getItem("token")),
        
      };
      this.http.post(`http://localhost:3000/secure/posts/${this.state.postPublicId}/comment` ,JSON.stringify(data ) , op )
      .toPromise().then(value => {
        console.log("comment added")
      }).catch(err => {
        console.log("there is an error adding post" , err.message)
      })
      this.commentData = ""
    }
  }