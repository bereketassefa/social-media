import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/user';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  topics  = ['angular' , 'react' , 'vue']
  newuser = new User("beki" , "beka@gmail.com" ,9090909 ,"angular" , "morning",false)
  constructor() { }
  
  ngOnInit(): void {
    // console.log(refer)
  }

}
