import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/Models/user';
import { TweetServiceService } from 'src/app/Services/tweet-service.service';
import { DatePipe } from '@angular/common';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { not } from '@angular/compiler/src/output/output_ast';
@Component({
  selector: 'app-searchuser',
  templateUrl: './searchuser.component.html',
  styleUrls: ['./searchuser.component.css']
})
export class SearchuserComponent implements OnInit {
  notFound=false;
  showError=false;
  success=false;
  email!:string;
  dob!:Date;
  user!:User;
  userName!:string;
  searchForm = new FormGroup({
    searchUserEmail:new FormControl('',[Validators.required,Validators.email])
});
  constructor(private service:TweetServiceService,private route:Router,private datePipe: DatePipe) { }

  ngOnInit(): void {
    this.email=String(localStorage.getItem('email')||{});
    this.userName=localStorage.getItem('userName')!;
  }
  searchUser(){
    if(this.searchForm.valid)
    {
      this.showError=false;
      this.success=true;
      this.service.getUser(String(this.searchForm.value.searchUserEmail)).subscribe(res=>{
        if(res==null){
          this.notFound=true;
        }
        else{
          console.log(res);
          this.user=res;
          let dobString = this.datePipe.transform(this.user.dob, 'yyyy-MM-dd');
          this.dob=new Date(dobString!);
          this.notFound=false;
        }
      });
    }
    else{
      this.success=false;
      this.showError=true;
    }
  }
  goHome(){
    this.route.navigateByUrl('/home');
  }
  logOut(){
    localStorage.clear();
    this.route.navigateByUrl('/login');
  }
}
