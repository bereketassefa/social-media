import { Component, OnInit } from '@angular/core';
import { UserServiceService } from '../user-service.service';

@Component({
  selector: 'app-practice',
  templateUrl: './practice.component.html',
  styleUrls: ['./practice.component.css']
})
export class PracticeComponent implements OnInit {

  users : {} = [];
  files: File[] = [];
  selectedFiles?: FileList;

  
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

  values = ["mother" , "mother"]

  logvalue  = (val: HTMLInputElement) => console.log(val.value)
  formvalue = "";
  newfun(){
    this.user.addUser()
  }

  onDrop(files: any) {
    console.log("file droped");
    for (let i = 0; i < files.length; i++) {
      let item = files.item(i);
      if (item)
        this.files.push(item);
      // console.log(files.item(i));
    }
  }
  
  selectFile(event: any): void {
    // debugger
    this.selectedFiles = event.target.files;
    // console.log("select file result ", this.selectedFiles);
    for (let i = 0; i < this.selectedFiles.length; i++) {
      let item = this.selectedFiles.item(i);
      if (item)
        this.files.push(item);
      // console.log(this.selectedFiles.item(i));
    }
  }


  onImageUploadedEvent(event: String[]) {
    // debugger
    let urls = null;
    var index = 0;
    for (let i = 0; i < event.length; i++) {
      urls = event[i];
    }
    if (urls) {
      // this.property.propertyImagesList.push({ id: null, url: urls, isPrimary: false });
      console.log(urls)
    }
    // debugger
    // console.log("Event => ", event);
    // console.log("Event Size => ", event.length);
    // console.log("Property Images now =>", this.property.propertyImagesList);
  }


  

}
