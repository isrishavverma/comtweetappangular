import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/Models/user';
import { TweetServiceService } from 'src/app/Services/tweet-service.service';
import { PasswordValidator } from 'src/app/Validator/PasswordValidator';

@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.css']
})
export class ForgotpasswordComponent implements OnInit {
  user!:User;
  updated=false;
  validateEmail!:boolean;
  dobverified=false;
  forgotForm = new FormGroup({
    email:new FormControl('',[Validators.required,Validators.email]),
    dob:new FormControl('',[Validators.required]),
    password:new FormControl('',[Validators.required,Validators.minLength(3)]),
    retypePassword:new FormControl('',[Validators.required,Validators.minLength(3)])
  });
  constructor(private service:TweetServiceService,private route:Router) { 
    this.forgotForm.controls['retypePassword'].setValidators([PasswordValidator(this.forgotForm),Validators.required]);
    this.forgotForm.controls['retypePassword'].updateValueAndValidity({onlySelf:true});
  }

  ngOnInit(): void {
  }
  onProceed(){
    console.log(this.forgotForm.controls['email'].valid);
    console.log(this.forgotForm.controls['email'].value);
    if(this.forgotForm.controls['email'].valid){
      this.service.forgotPassword(this.forgotForm.controls['email'].value).subscribe(res=>{
        console.log(res);
        if(res==null){
          this.validateEmail=false;
        }
        else{
          this.user=res;
          this.validateEmail=true;
        }
      });
    }
  }
  onVerify(){
    console.log(this.forgotForm.controls['dob'].value==this.user.dob);
    console.log(this.user.dob);
    if(this.forgotForm.controls['dob'].valid){
      if(this.forgotForm.controls['dob'].value==this.user.dob){
        this.dobverified=true;
      }
      else{
        this.dobverified=false;
      }
    }
  }
  onSubmit(){
    console.log(this.forgotForm);
    console.log(this.forgotForm.value.password);
    if(this.forgotForm.valid){
      var updateUser = new User;
      updateUser.id=this.user.id;
      updateUser.dob=this.user.dob;
      updateUser.email=this.user.email
      updateUser.gender=this.user.gender
      updateUser.name=this.user.name
      updateUser.passcode=String(this.forgotForm.value.password);
      console.log(JSON.stringify(updateUser));
      this.service.updateUser(updateUser,this.user.email).subscribe(res=>{
        console.log(res);
        this.updated=true;
      });
    }
  }
  goLogin(){
    this.route.navigateByUrl('login');
  }
}
