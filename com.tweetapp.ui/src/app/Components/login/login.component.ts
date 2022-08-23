import { Component, OnInit } from '@angular/core';
import {  Form, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, Observer, of } from 'rxjs';
import { Tokens } from 'src/app/Models/tokens';
import { User } from 'src/app/Models/user';
import { TweetServiceService } from 'src/app/Services/tweet-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  //user!:User;
  submitted=false;
  loginToken!:Tokens;
  loginSuccess=false;
  loginForm = new FormGroup({
    email:new FormControl('',[Validators.required,Validators.email]),
    password:new FormControl('',[Validators.required,Validators.minLength(3)])
  });
  constructor(private service:TweetServiceService,private route:Router) { }

  ngOnInit(): void {
    console.log('onIt');
    if(localStorage.getItem('token')!=null)
    {
      this.route.navigateByUrl('home', { skipLocationChange: true });
    }
  }
  onSubmit(){

    //let emailId=loginForm['email'].value;
    //let password=loginForm['password'].value;
    console.log(this.loginForm);
    if(this.loginForm.valid)
    {
      this.service.Login(this.loginForm.value['email'],this.loginForm.value['password']).subscribe(res=>{
        this.loginToken=res;
        console.log(String(this.loginToken.token));
        if(String(this.loginToken.token)!=null)
        {
          this.loginSuccess=true;
          console.log('valid');
          localStorage.setItem("token",this.loginToken.token);
          localStorage.setItem("email",this.loginForm.value['email']);
          // this.route.navigate(['home'], { skipLocationChange: true })
          this.route.navigateByUrl('home', { skipLocationChange: true });
        }
      });
    }
    else{
      alert('Please enter valid credentials!');
    }
  }
}
