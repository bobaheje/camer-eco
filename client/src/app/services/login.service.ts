/* eslint-disable no-console */
/* eslint-disable no-invalid-this */
import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {JwtHelperService} from '@auth0/angular-jwt';
import { NgForm } from '@angular/forms';
import { map } from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})
export class LoginService {
  currentUser:string | undefined;
  url='http://localhost:3000/api/v1/login';
  constructor(private http:HttpClient) { 
    const token=localStorage.getItem('token');
    if(token && token!=='undefined'){
      const jwt=new JwtHelperService();
      this.currentUser=jwt.decodeToken(token);
    
    }
  }

  login=(credentials:NgForm)=>{
    const headers=new HttpHeaders()
                      .set('content-type', 'application/json')
                      .set('Access-Control-Allow-Origin', '*')
                      .set('Accept', '*/*');
    return this.http.post(this.url, JSON.stringify(credentials), {headers})
                    .pipe(map( response =>{
                      if(response){
                        localStorage.setItem('token', JSON.stringify(response));
                        console.log(`le token ${JSON.stringify(response)}`);
                        return true;
                      }
                      return false;
                      
                    }));
  }
}
