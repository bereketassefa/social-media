import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormComponent } from './components/form/form.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './Pages/profile/profile.component';
import { PracticeComponent } from './practice/practice.component';
import { AuthGuardOutService } from './services/guard/auth-guard-out.service';
import { AuthGuardService } from './services/guard/auth-guard.service';
import { SignupComponent } from './signup/signup.component';
import { FriendsComponent } from './pages/friends/friends.component';
import { FriendslistComponent } from './Pages/friendslist/friendslist.component';
// import { FriendsComponent } from './pages/friends/friends.component';


const routes: Routes = [
  //AuthGuardOutService
  {path: 'login' ,canActivate: [], component:LoginComponent},
  {path: 'trial' , component:PracticeComponent}, //,canActivate: [AuthGuardOutService]
  {path: 'signup'  ,canActivate: [], component:SignupComponent},
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path: 'home',canActivate: [AuthGuardService], pathMatch: 'full' , component: HomeComponent},
  {path: 'profile',canActivate: [AuthGuardService], pathMatch: 'full' , component: ProfileComponent},
  {path: 'friends',canActivate: [AuthGuardService], pathMatch: 'full' , component: FriendsComponent},
  {path: 'list',canActivate: [AuthGuardService], pathMatch: 'full' , component: FriendslistComponent},
  {path: 'form', component: FormComponent},
  {path: '**', redirectTo: 'login', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
