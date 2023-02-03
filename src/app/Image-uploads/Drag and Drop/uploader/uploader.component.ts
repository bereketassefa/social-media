import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-uploader',
  templateUrl: './uploader.component.html',
  styleUrls: ['./uploader.component.css']
})
export class UploaderComponent {

  isHovering?: boolean;

  files: File[] = [];


  toggleHover(event: any) {
    this.isHovering = event;
    
  }

  onDrop(files: any) {
    
    for (let i = 0; i < files.length; i++) {
      let item = files.item(i); if (item) this.files.push(item);
    }
    
  }
  showresult(Event: any){
    console.log(Event);
  }

}