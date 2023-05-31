import { Component, EventEmitter, Input, OnChanges, OnInit ,Output } from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';
import {HttpClient,HttpHeaders} from '@angular/common/http';
import { StateService } from 'src/app/services/state.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit  , OnChanges{
  showAlert = false
  isliked:any = false

  @Input("username") username:string;
  @Input("content") content:string;
  @Input("data") data:string;
  @Input("images") images:any[];
  @Input("imgurl") imgurl: any;
  @Input("likes") likes: object[]
  @Input("comments") comments: any;
  @Input("id") id: any;
  @Input("postPublicId") postPublicId: any;
  @Output() newItemEvent = new EventEmitter<boolean>();

  totalLikes: number 
  


  allImage: any = []
  
  
  constructor(private sanitizer:DomSanitizer , 
    private http: HttpClient,
    private state: StateService) { }
  
  ngOnInit(): void {

    let val = this.likes.find((each: any) => {
      console.log(each.appUser.id === 8)
      return each.appUser.id === 8
    }
      ) 
    if (val) {
      this.isliked = true
    }
    // console.log(this.likes)
    this.totalLikes = this.likes.length
  }
  ngOnChanges(): void{
    this.totalLikes = this.likes.length

  }


  sanitize(url:string){
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }

  showAlertt(){
    this.totalLikes = this.likes.length
    this.state.commentState=!this.state.commentState
    this.state.commentId = this.id
    this.state.postPublicId = this.postPublicId
    
    console.log("comment" , this.postPublicId)
    this.newItemEvent.emit(!this.state.commentState)
  }

  likepost(){
    let op = {
      headers: new HttpHeaders().set('Content-Type', 'application/json').set("userId" , '8').set("token" , localStorage.getItem("token")),
      
    };
    if(this.isliked){
      //unlike the post

      this.isliked  = !this.isliked
      this.totalLikes = this.totalLikes -1
      // let data = this.http.post(`http://localhost:8080/posts/${this.id}/likes`  ,{} ,op)
      // .toPromise().then(value => {
      //   console.log("post succesfully liked" , value)
      // }).catch(err => {
      //   console.log("there is an error adding post")
      // })
    }
    else{
      this.isliked  = !this.isliked
      if(this.totalLikes){
        this.totalLikes = this.totalLikes + 1
      }
      else{
        this.totalLikes = 1
      }
      let data = this.http.post(`http://localhost:8080/posts/${this.id}/likes`  ,{} ,op)
      .toPromise().then(value => {
        console.log("post succesfully liked" , value)
      }).catch(err => {
        console.log("there is an error adding post")
      })
    }
  }

}
