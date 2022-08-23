import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { Tokens } from '../Models/tokens';
import { map } from 'rxjs';
import { Tweet } from '../Models/tweet';
import { User } from '../Models/user';
import { Reply } from '../Models/reply';
@Injectable({
  providedIn: 'root'
})
export class TweetServiceService {
//   readonly APIUrl = "http://localhost:7190/api/v1.0/Tweets/";
    readonly APIUrl = "https://comtweetapp20220823103927.azurewebsites.net/api/v1.0/Tweets/";
  constructor(private http: HttpClient) {}
    public Login(email:string,password:string):Observable<Tokens>
    {
        const headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
        let queryParams = {"email":email,"password":password};
        return this.http.post<any>(this.APIUrl+'login/','{}' ,{params:queryParams ,responseType: 'json'})
    }
    getUserList(): Observable < User[] > {
        return this.http.get < any > (this.APIUrl + 'users/all');
    }
    getUser(email:string): Observable < User > {
        return this.http.get < any > (this.APIUrl + 'user/search/'+email);
    }
    registerUser(user: User) {
        return this.http.post(this.APIUrl + 'users/register', user);
    }
    forgotPassword(email:string): Observable < User > {
        return this.http.get < any > (this.APIUrl+email + '/forgot');
    }
    updateUser(user: User,email:string) {
        return this.http.put(this.APIUrl + 'users/update/'+email, user);
    }
    // deleteUser(id: any) {
    //     return this.http.delete(this.APIUrl + '/Student/' + id);
    // }
    getTweetsByUser(email:string): Observable < Tweet[] > {
        let queryParams = {"email":email};
        return this.http.get < any > (this.APIUrl+email ,{responseType: 'json'});
    }
    getTweetsList(): Observable < Tweet[] > {
        return this.http.get < any > (this.APIUrl +'all',{responseType: 'json'});
    }
    postTweet(tweet: Tweet,email:string) {
        let queryParams = {"message":tweet.tweetMessage,};
        return this.http.post(this.APIUrl + email+'/add/', tweet,{params:queryParams ,responseType: 'json'});
    }
    updateTweet(val: any) {
        return this.http.put(this.APIUrl + '/Department', val);
    }
    likeTweet(email: string,id:string) {
        return this.http.post(this.APIUrl + email+'/like/'+id, {},{responseType: 'json'});
    }
    getLikes(tweetId:string): Observable < User[] > {
        return this.http.get < any > (this.APIUrl +'getlikes/'+tweetId,{responseType: 'json'});
    }
    getReplies(tweetId:string): Observable < Reply[] > {
        return this.http.get < any > (this.APIUrl +'getReplies/'+tweetId,{responseType: 'json'});
    }
    replyOnTweet(email: string,id:string,comment:string) {
        let queryParams = {"replyMessage":comment};
        return this.http.post(this.APIUrl + email+'/reply/'+id, {},{params:queryParams ,responseType: 'json'});
    }
}
