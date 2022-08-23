import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Tweet } from 'src/app/Models/tweet';
import { TweetServiceService } from 'src/app/Services/tweet-service.service';
import { DatePipe } from '@angular/common';
import { FormControl, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-post-tweet',
  templateUrl: './post-tweet.component.html',
  styleUrls: ['./post-tweet.component.css']
})
export class PostTweetComponent implements OnInit {
  showError=false;
  success=false;
  email!:string;
  userName!:string;
  tweet= new Tweet;
  tweetForm = new FormGroup({
    message:new FormControl('',[Validators.required,Validators.minLength(10)])
});
  constructor(private service:TweetServiceService,private route:Router,private datePipe: DatePipe) { }

  ngOnInit(): void {
    this.email=String(localStorage.getItem('email')||{});
    this.userName=localStorage.getItem('userName')!;
  }
  postTweet(){
    let current=new Date(Date.now());
    this.tweet.id=' ';
    this.tweet.tweetMessage=this.tweetForm.value.message;
    this.tweet.tweetTime=current;
    this.tweet.userEmail=this.email;
    if(this.tweetForm.valid)
    {
      this.showError=false;
      this.success=true;
      this.service.postTweet(this.tweet,this.email).subscribe(res=>{
        console.log(res);
      });
    }
    else{
      this.success=false;
      this.showError=true;
    }
  }
  takeHome(){
    this.route.navigateByUrl('home');
  }
  logOut(){
    localStorage.clear();
    this.route.navigateByUrl('/login');
  }
}
