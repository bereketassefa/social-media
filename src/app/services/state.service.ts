import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StateService {

 commentState: boolean = false
 commentId: number = 1
 postPublicId:any
 
  constructor() {
    
   }

}
