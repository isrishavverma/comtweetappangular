import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/Models/user';
import { TweetServiceService } from 'src/app/Services/tweet-service.service';
import { PasswordValidator } from 'src/app/Validator/PasswordValidator';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  success=false;
  registerUser:User;
  dob!:Date;
  registerForm = new FormGroup(
    {
    fullName:new FormControl('',[Validators.required]),
    email:new FormControl('',[Validators.required,Validators.email]),
    dob:new FormControl('',[Validators.required]),
    gender:new FormControl('',[Validators.required]),
    password:new FormControl('',[Validators.required,Validators.minLength(3)]),
    retypePassword:new FormControl('',[Validators.required,Validators.minLength(3)])
  });
  constructor(private service:TweetServiceService,private route:Router,private datePipe: DatePipe) {
    this.registerUser=new User;
    this.registerForm.controls['retypePassword'].setValidators([PasswordValidator(this.registerForm),Validators.required]);
    this.registerForm.controls['retypePassword'].updateValueAndValidity({onlySelf:true});
   }

  ngOnInit(): void {

  }
  get f() {
    return this.registerForm.controls;
  }
  validatePassword(pass:string,retype:string){
    if(pass==retype){
      return true;
    }
    return false;
  }
  onCancel(){
    this.route.navigateByUrl('login');
  }
  onSubmit(){
    console.log(this.registerForm);
    // console.log(this.registerForm.value.gender);
    if(this.registerForm.valid){
      this.dob=this.registerForm.value.dob;
      let dobString= this.datePipe.transform(this.dob, 'yyyy-MM-dd');
      this.registerUser.id="";
      this.registerUser.dob=String(dobString);
      this.registerUser.email=this.registerForm.value.email;
      this.registerUser.gender=this.registerForm.value.gender;
      this.registerUser.name=this.registerForm.value.fullName;
      this.registerUser.passcode=this.registerForm.value.password;
      console.log(this.registerUser);
      this.service.registerUser(this.registerUser).subscribe(res=>{
        console.log(res);
        if(res==null){
          this.success=true;
        }
      });
    }
  }
}
