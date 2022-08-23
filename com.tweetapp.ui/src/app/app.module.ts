import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { TweetServiceService } from './Services/tweet-service.service';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from "@angular/common/http";
import { FormsModule,ReactiveFormsModule } from "@angular/forms";
import { HomeComponent } from './Components/home/home.component';
import { LoginComponent } from './Components/login/login.component';
import { RegisterComponent } from './Components/register/register.component';
import { ProfileComponent } from './Components/profile/profile.component';
import { SearchuserComponent } from './Components/searchuser/searchuser.component';
import { PostTweetComponent } from './Components/post-tweet/post-tweet.component';
import {DatePipe} from '@angular/common';
import { EditProfileComponent } from './Components/edit-profile/edit-profile.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { LikeDialogComponentComponent } from './Components/like-dialog-component/like-dialog-component.component';
import { ReplyDialogComponentComponent } from './Components/reply-dialog-component/reply-dialog-component.component';
import { MatDialogModule } from '@angular/material/dialog';
import { Guardservice } from './Services/guardservice';
import { ForgotpasswordComponent } from './Components/forgotpassword/forgotpassword.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    ProfileComponent,
    SearchuserComponent,
    PostTweetComponent,
    EditProfileComponent,
    LikeDialogComponentComponent,
    ReplyDialogComponentComponent,
    ForgotpasswordComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,FormsModule,ReactiveFormsModule, NoopAnimationsModule,MatDialogModule
  ],
  providers: [TweetServiceService,DatePipe,Guardservice],
  bootstrap: [AppComponent],
  entryComponents: [LikeDialogComponentComponent,ReplyDialogComponentComponent]
})
export class AppModule { }
