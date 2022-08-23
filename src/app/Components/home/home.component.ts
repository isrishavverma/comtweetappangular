import { Component, OnInit } from '@angular/core';
import { TweetServiceService } from 'src/app/Services/tweet-service.service';
import { Router } from '@angular/router';
import { Tweet } from 'src/app/Models/tweet';
import { User } from 'src/app/Models/user';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import { LikeDialogComponentComponent } from '../like-dialog-component/like-dialog-component.component';
import { ReplyDialogComponentComponent } from '../reply-dialog-component/reply-dialog-component.component';
import { Reply } from 'src/app/Models/reply';
import { showReply } from 'src/app/Models/showReply';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  alreadyLiked=false;
  toggleLike=false;
  email!:string;
  likedBy!:User[];
  replies!:Reply[];
  showReply:showReply[];
  tweetReplyId!:string;
  tweetReplyMessage!:string;
  likeTweet=false;
  userName!:string;
  user!:User;
  tweets!:Tweet[];
  users!:User[];
  map = new Map<string, string>();
  constructor(private service:TweetServiceService,private route:Router,private dialog: MatDialog) {
    this.showReply=[];
   }

  ngOnInit(): void {
    this.email=String(localStorage.getItem('email')||{});
    this.onLoad();
  }
  onLoad(){
    this.service.getUser(this.email).subscribe(res=>{
      this.user=res;
    });
    this.service.getUserList().subscribe(res=>{
      this.users=res;
      this.users.forEach(x=>
        {
          this.map.set(x.email,x.name);
          console.log('MAP:'+this.map.get(x.email));
        });
        this.userName=this.map.get(this.email)!;
        localStorage.setItem("userName",this.userName!);
    });
    this.service.getTweetsList().subscribe(res=>{
      this.tweets=res;
    });
  }
  onLike(id:string){
    console.log(id);
    this.toggleLike=true;
    this.service.getLikes(id).subscribe(res=>{
      this.likedBy=res;
      this.alreadyLiked=false;
      this.likedBy.forEach(x=>{
        if(this.userName==x.name){
          console.log(x.name+' already likes this');
          this.alreadyLiked=true;
        }
      });
      this.openLikeDialog(id);
    });
  }
  onReply(id:string){
    console.log('Id:'+id);
    this.tweetReplyId=id;
    this.toggleLike=true;
    this.service.getReplies(id).subscribe(res=>{
      // console.log('RES');
      this.replies=res;
      // console.log(this.replies);
      this.replies.forEach(x=>{
        // console.log(x.userId+':'+x.replyMessage);
        for(let user of this.users){
          if(user.id==x.userId){
            // console.log(user.name+':'+x.replyMessage);
            this.showReply.push({
              replyBy:user.name,
              replyMessage:x.replyMessage
            });
          }
        }
      });
      console.log(this.showReply);
      this.openReplyDialog();
      this.showReply=[];
    });
  }
  openLikeDialog(tweetId:string) {

    const dialogConfig = new MatDialogConfig();

    // dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    dialogConfig.data = this.likedBy;

    // this.dialog.open(LikeDialogComponentComponent, dialogConfig); 
    const dialogRef = this.dialog.open(LikeDialogComponentComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(
        data => {
          if(data==undefined){
            console.log('No DATA');
          }
          else{
            this.likeTweet = data;
            console.log(this.likeTweet);
            if(this.likeTweet && !this.alreadyLiked){
              console.log('CALL TO LIKE:'+tweetId);
              this.service.likeTweet(this.email,tweetId).subscribe(res=>{
                console.log(res);
              })
            }
            else if(this.likeTweet && this.alreadyLiked){
              console.log('NO CALL(ALREADY LIKED)');
            }
            else{
              console.log('NO CALL AT ALL');
            }
          }
        }
    );
  } 
  openReplyDialog() {

    const dialogConfig = new MatDialogConfig();

    // dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    dialogConfig.data = this.showReply;

    const dialogRef = this.dialog.open(ReplyDialogComponentComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(
        data => {
          if(data==undefined){
            console.log('No DATA');
          }
          else{
            console.log("Dialog output:", data);
            this.tweetReplyMessage=data;
            this.replyTweet();
          }
        }
    );
  } 
  replyTweet(){
    this.service.replyOnTweet(this.email,this.tweetReplyId,this.tweetReplyMessage).subscribe(res=>{
      console.log(res);
      this.route.navigateByUrl('home');
    });
  }
  logOut(){
    localStorage.clear();
    this.route.navigateByUrl('/login');
  }

}
