import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormComponent } from './components/form/form.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { PracticeComponent } from './practice/practice.component';
import { AuthGuardOutService } from './services/guard/auth-guard-out.service';
import { AuthGuardService } from './services/guard/auth-guard.service';
import { SignupComponent } from './signup/signup.component';

const routes: Routes = [
  //AuthGuardOutService
  {path: 'login' ,canActivate: [], component:LoginComponent},
  {path: 'trial' , component:PracticeComponent}, //,canActivate: [AuthGuardOutService]
  {path: 'signup'  ,canActivate: [], component:SignupComponent},
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path: 'home',canActivate: [AuthGuardService], pathMatch: 'full' , component: HomeComponent},
  {path: 'form', component: FormComponent},
  {path: '**', redirectTo: 'login', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
