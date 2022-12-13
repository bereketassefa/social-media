import { Component, OnInit } from '@angular/core';
import { UserServiceService } from '../user-service.service';

@Component({
  selector: 'app-practice',
  templateUrl: './practice.component.html',
  styleUrls: ['./practice.component.css']
})
export class PracticeComponent implements OnInit {

  users : {} = [];

  
  constructor(private user: UserServiceService){

    

  }

  status = true;
  posts : any = []

  classes = {
    "red": this.status,
    "green": !this.status
  }



  ngOnInit(): void {
    this.users = this.user.getUsers();
    this.user.getPost().subscribe(data =>{ this.posts = data;console.log(data)})
  }

  values = ["mother" , "fucker"]

  logvalue  = (val: HTMLInputElement) => console.log(val.value)
  formvalue = "";
  newfun(){
    this.user.addUser()
  }

}
