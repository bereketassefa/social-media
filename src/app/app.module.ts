import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import {FormsModule} from '@angular/forms';
import { PracticeComponent } from './practice/practice.component';
import { UserServiceService } from './user-service.service';
import {HttpClientModule} from '@angular/common/http';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { FormComponent } from './components/form/form.component';
import { UploaderComponent } from './Image-uploads/Drag and Drop/uploader/uploader.component';
import { UploadTaskComponent} from './Image-uploads/Drag and Drop/upload-task/upload-task.component';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from 'src/environments/environment';
import { CommonModule } from '@angular/common';
import { DropzoneDirective } from './Image-uploads/Drag and Drop/dropzone.directive';
import { DndDirective } from './components/image-uploader/dnd.directive';
import { ImageUploaderComponent } from './components/image-uploader/image-uploader.component';
import { PostComponent } from './components/post/post.component';
import { ProfileComponent } from './Pages/profile/profile.component';
import { FriendsComponent } from './pages/friends/friends.component';
import { FriendslistComponent } from './Pages/friendslist/friendslist.component';
import { ProfiledetailComponent } from './components/profiledetail/profiledetail.component';

@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    LoginComponent,
    PracticeComponent,
    HomeComponent,
    NavbarComponent,
    SidebarComponent,
    FormComponent,
    UploaderComponent,
    UploadTaskComponent,
    DropzoneDirective,
    DndDirective,
    ImageUploaderComponent,
    PostComponent,
    ProfileComponent,
    FriendsComponent,
    FriendslistComponent,
    ProfiledetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireStorageModule,
    CommonModule
  ],
  providers: [UserServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
