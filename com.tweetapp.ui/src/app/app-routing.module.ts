import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditProfileComponent } from './Components/edit-profile/edit-profile.component';
import { ForgotpasswordComponent } from './Components/forgotpassword/forgotpassword.component';
import { HomeComponent } from './Components/home/home.component';
import { LoginComponent } from './Components/login/login.component';
import { PostTweetComponent } from './Components/post-tweet/post-tweet.component';
import { ProfileComponent } from './Components/profile/profile.component';
import { RegisterComponent } from './Components/register/register.component';
import { SearchuserComponent } from './Components/searchuser/searchuser.component';
import { Guardservice } from './Services/guardservice';

const routes: Routes = [
  {path:'login', component:LoginComponent},
  {path:'home', component:HomeComponent,canActivate:[Guardservice]},
  {path:'register', component:RegisterComponent},
  {path:'forgot', component:ForgotpasswordComponent},
  {path:'profile', component:ProfileComponent,canActivate:[Guardservice]},
  {path:'editprofile', component:EditProfileComponent,canActivate:[Guardservice]},
  {path:'seachUser', component:SearchuserComponent,canActivate:[Guardservice]},
  {path:'post', component:PostTweetComponent,canActivate:[Guardservice]},
  {path:'', component:LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
