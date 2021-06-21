/* eslint-disable no-invalid-this */
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgForm } from '@angular/forms';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  url='http://localhost:1500/api/v1/login';
  private currentUserSubject: BehaviorSubject<string>;
  private currentuserRoleSubject:BehaviorSubject<string>;
  private isLoggedInSubject:BehaviorSubject<boolean>;
  private currentUserIdSubject:BehaviorSubject<number>;
  public currentUserRole:Observable<string>;
  public currentUser: Observable<string>;
  public isLoggedIn:Observable<boolean>;
  public currentUserId:Observable<number>;

  
  constructor(private http:HttpClient) {
    
       
    this.currentUserSubject=new BehaviorSubject(localStorage.getItem('username')||'');
    this.currentUser = this.currentUserSubject.asObservable();
    
    this.currentuserRoleSubject=new BehaviorSubject(localStorage.getItem('role')||'');
    this.currentUserRole = this.currentuserRoleSubject.asObservable();

    this.isLoggedInSubject=new BehaviorSubject<boolean>(false);
    this.isLoggedIn = this.isLoggedInSubject.asObservable();

    const id=localStorage.getItem('id')||'0';
    const tmpId=parseInt(id);
    this.currentUserIdSubject=new BehaviorSubject<number>(tmpId);
    this.currentUserId = this.currentUserIdSubject.asObservable();

    

   }

  signin=(credentials:NgForm)=>{
    const headers=new HttpHeaders()
                      .set('content-type', 'application/json')
                      .set('Access-Control-Allow-Origin', '*')
                      .set('Accept', '*/*');
    return this.http.post(this.url, JSON.stringify(credentials), {headers})
    .subscribe(res=>{
      localStorage.setItem('token', JSON.stringify(res));
      const jwt=new JwtHelperService();
      let token=localStorage.getItem('token')||'';
      token=token?.split(' ')[1];
      const returnToken=jwt.decodeToken(token);
      const {data}=returnToken;
      
      localStorage.setItem('id', JSON.stringify(data.id));
      localStorage.setItem('username', JSON.stringify(data.username));
      localStorage.setItem('role', JSON.stringify(data.role));

      this.currentUserIdSubject.next(parseInt(localStorage.getItem('id')||'0'));
      this.currentUserSubject.next(localStorage.getItem('username')||'');
      this.currentuserRoleSubject.next(localStorage.getItem('role')||'');
      this.isLoggedInSubject.next(true);
      console.log(this.currentUserSubject.value);
            

    });
    

  }

  logOut=()=>{
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('role');
    localStorage.removeItem('id');

    this.currentUserSubject.next('');
    this.currentuserRoleSubject.next('');
    this.isLoggedInSubject.next(false);
    this.currentUserIdSubject.next(0);
  }
  getCurrentUser=()=>{
  console.log(localStorage.getItem('username'));
  
   return JSON.parse(this.currentUserSubject.value);
   //return this.currentUserSubject.value;
  }

  getCurrentUserRole=()=>{
    return JSON.parse(this.currentuserRoleSubject.value);

  }

  getUserId=()=>{
    return this.currentUserIdSubject.value;
  }

 
  isLogIn=()=>{
    const token=this.getToken();
    const isExpired= new JwtHelperService().isTokenExpired(token||'');
    if(! isExpired) {return true;}
    
    localStorage.removeItem(token||'');
    localStorage.removeItem('username');
    localStorage.removeItem('role');
    localStorage.removeItem('id');

    this.currentUserSubject.next('');
    this.currentuserRoleSubject.next('');
    this.isLoggedInSubject.next(false);
    this.currentUserIdSubject.next(0);
    return false;
    
    
    
  }
  getToken=()=>{
    return localStorage.getItem('token');
  }

}
