import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Route, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AuthServiceService } from '../auth-service.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private authService: AuthServiceService,private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): 
  boolean | Promise<boolean> | Observable<boolean > | any {
      let isLogedIn = this.authService.LogedIn();
      if(isLogedIn){
        // this.router.navigate(['/home']);
        return true;
      }
      else {
        this.router.navigate(['/']);
      }
  }
}
