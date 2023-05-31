import { Component, OnInit } from '@angular/core';
import {HttpClient, HttpParams  , HttpHeaders} from '@angular/common/http';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  userPublicId:String 

  constructor(private http: HttpClient,) { 
    this.userPublicId = localStorage.getItem("userPublicId")
  }

  ngOnInit(): void {
  }

}
