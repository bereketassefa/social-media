import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { PracticeComponent } from './practice/practice.component';
import { SignupComponent } from './signup/signup.component';

const routes: Routes = [
  {path: 'login' , component:LoginComponent},
  {path: 'trial' , component:PracticeComponent},
  {path: 'signup' , component:SignupComponent},
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path: '**', redirectTo: 'login', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
