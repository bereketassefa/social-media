import { Component, OnInit , Input} from '@angular/core';
import {HttpClient, HttpParams  , HttpHeaders} from '@angular/common/http';


@Component({
  selector: 'app-profiledetail',
  templateUrl: './profiledetail.component.html',
  styleUrls: ['./profiledetail.component.css']
})
export class ProfiledetailComponent implements OnInit {

  showAlert = false;
  showLoader = false;
  imageURLs: any = ["https://images.unsplash.com/photo-1585409677983-0f6c41ca9c3b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1169&q=80"]
  @Input("isprofile") isprofile: boolean;
  @Input("userid") userid: any;
  @Input("username") username: string;
  posts: any = []

  constructor(private http: HttpClient,) { }

  ngOnInit(): void {
    let data = this.http.get(`http://localhost:3000/public/users/${this.userid}/posts` )
    .toPromise().then(postvalue => {
      
      
      for (let key in postvalue) {
        this.posts.push(postvalue[key as keyof typeof postvalue])
      }
      this.posts = postvalue
      console.log(postvalue)
    }).catch(err => {
      console.log(err)
    })
  }

  addURL(event:string){
    this.imageURLs = event
    console.log("from parent" , this.imageURLs)
    this.showLoader = false;
  }


  updateProfile(){
    // let body = new URLSearchParams();
    // body.set('content', "");
    //  body.set('password', "");
    let thepostdata = {
      profileImageUrl:this.imageURLs[0],
    }
    console.log(thepostdata)
    let op = {
      headers: new HttpHeaders().set('Content-Type', 'application/json').set("userPublicId" , localStorage.getItem("userPublicId")).set("token" , localStorage.getItem("token")),
      
    };

    console.log(thepostdata)
    let data = this.http.post("http://localhost:3000/secure/update-profile-picture" ,JSON.stringify(thepostdata) ,op)
    .toPromise().then(value => {
      console.log(value)
    }).catch(err => {
      console.log("there is an error adding post")
    })
  }


  showComment(){
    console.log("cons")
  }

}
