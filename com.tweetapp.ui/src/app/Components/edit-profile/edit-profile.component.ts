import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TweetServiceService } from 'src/app/Services/tweet-service.service';
import { DatePipe } from '@angular/common';
import { User } from 'src/app/Models/user';
import { FormControl, FormGroup } from '@angular/forms';
@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {
  updated=false;
  email!:string;
  user!:User;
  updatedUser= new User;
  userName!:string;
  dob!:Date;
  genders=['Male','Female','Others'];
  editProfileForm!:FormGroup;
  constructor(private service:TweetServiceService,private route:Router,private datePipe: DatePipe) { }

  ngOnInit(): void {
    this.email=String(localStorage.getItem('email')||{});
    this.userName=localStorage.getItem('userName')!;
    this.onLoad();
  }
  onLoad()
  {

    this.service.getUser(this.email).subscribe(res=>{
      this.user=res;
      console.log(this.user.dob);
      // this.dob = this.user.dob.split('-');
      let dobString = this.datePipe.transform(this.user.dob, 'yyyy-MM-dd');
      this.dob=new Date(dobString!);
      this.editProfileForm = new FormGroup({
        name:new FormControl(this.user.name),
        email:new FormControl(this.user.email),
        city:new FormControl('Kolkata'),
        gender:new FormControl(this.user.gender),
        day:new FormControl(this.dob.getUTCDate()),
        month:new FormControl(this.dob.getUTCMonth()+1),
        year:new FormControl(this.dob.getUTCFullYear())
      });
      // this.dob.forEach(element => {
      //   this.day=Number(element);
      // });
    });
  }
  onSubmit(){
    let userDOB = this.editProfileForm.value.day+'-'+this.editProfileForm.value.month+'-'
                  +this.editProfileForm.value.year;
    this.updatedUser.id=" ";
    this.updatedUser.dob=userDOB;
    this.updatedUser.email=String(this.editProfileForm.value.email);
    this.updatedUser.gender=String(this.editProfileForm.value.gender);
    this.updatedUser.name=String(this.editProfileForm.value.name);
    this.updatedUser.passcode=String(this.user.passcode);
    console.log(this.updatedUser);
    console.log(JSON.stringify(this.updatedUser));
    this.service.updateUser(this.updatedUser,this.email).subscribe(res=>{
      console.log(res);
      this.updated=true;
    });
  }
  takeBack(){
    this.route.navigateByUrl('profile');
  }
  logOut(){
    localStorage.clear();
    this.route.navigateByUrl('/login');
  }
}
