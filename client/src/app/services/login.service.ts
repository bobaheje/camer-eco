/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-console */
/* eslint-disable no-invalid-this */
import { Injectable, Input } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {JwtHelperService} from '@auth0/angular-jwt';
import { NgForm } from '@angular/forms';
import { map } from 'rxjs/operators';
import { User } from '../models/user';
import { UserService } from './user.service';
import { AuthService } from './auth.service';








@Injectable({
  providedIn: 'root'
})
export class LoginService {
  @Input() currentUser: | any;
  @Input() username:string|any;
  @Input() userrole:string|any;
  url='http://localhost:1500/api/v1/login';
  constructor(
    private http:HttpClient, 
    private userService:UserService,
    private authService:AuthService
    ) { }
      
      // this.currentUser=jwt.decodeToken(token);
  
  login=(credentials:NgForm)=>{
    const isLogged=false;
    let data;
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
                      this.userService.getUserById(parseInt(data.id))
                                  .pipe(map(result=>{
                                    const user=result;
                                    localStorage.setItem('username', JSON.stringify(`${user.nom} ${user.prenom}`));
                                    localStorage.setItem('role', JSON.stringify(`${user.role}`));
                                  }));
                                  
                      
                      
                    });
            
                   
  }
  logOut=()=>{
    this.authService.logOut();
  }
  getUser=()=>{
    
    return this.authService.getCurrentUser();
  }

  getRole=()=>{
    return this.authService.getCurrentUserRole();

  }

 
  isLoggedIn=()=>{
    return this.authService.isLoggedIn;
    
  }
}




