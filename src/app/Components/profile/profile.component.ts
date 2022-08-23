import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/Models/user';
import { TweetServiceService } from 'src/app/Services/tweet-service.service';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  email!:string;
  user!:User;
  userName!:string;
  dob!:Date;
  day!:number;
  month!:number;
  year!:number;
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
      // this.dob.forEach(element => {
      //   this.day=Number(element);
      // });
      console.log(this.dob.getUTCDate());
      console.log(this.dob.getMonth()+1);
      console.log(this.dob.getUTCFullYear());
    });
    
  }
  editProfile(){
    this.route.navigateByUrl('editprofile');
  }
  logOut(){
    localStorage.clear();
    this.route.navigateByUrl('/login');
  }
}
