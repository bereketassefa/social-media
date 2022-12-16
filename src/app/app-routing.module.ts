import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { PracticeComponent } from './practice/practice.component';
import { AuthGuardOutService } from './services/guard/auth-guard-out.service';
import { AuthGuardService } from './services/guard/auth-guard.service';
import { SignupComponent } from './signup/signup.component';

const routes: Routes = [
  {path: 'login' ,canActivate: [AuthGuardOutService], component:LoginComponent},
  {path: 'trial' ,canActivate: [AuthGuardOutService], component:PracticeComponent},
  {path: 'signup'  ,canActivate: [AuthGuardOutService], component:SignupComponent},
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path: 'home',canActivate: [AuthGuardService], pathMatch: 'full' , component: HomeComponent},
  {path: '**', redirectTo: 'login', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
