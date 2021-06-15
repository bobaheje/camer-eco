/* eslint-disable no-invalid-this */
import { Input } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { map } from 'rxjs/operators';
import { LoginService } from '../services/login.service';
import { UserService } from '../services/user.service';
import {User} from '../models/user';
import { AuthService } from '../services/auth.service';



@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  @Input() currentuser:string|any;
  @Input() currentuserRole:string|any;
  @Input() currentUserId:number|0;
  constructor(
    private route:ActivatedRoute, 
    private authService:AuthService, 
    private router:Router
    
    ) { 
    if(!authService.isLoggedIn){ 
      this.authService.logOut();
      router.navigate(['/login']);
    };
     this.currentuser=this.authService.getCurrentUser();
     this.currentuserRole=authService.getCurrentUserRole();
     this.currentUserId=authService.getUserId();
    
  }

  getUser=()=>{
     return this.currentuser;
  }

  getRole =()=>{
    return this.currentuserRole;
  }

  getId=()=>{
    return this.currentUserId;
  }

  onLogout=()=>{
    this.authService.logOut();
    this.router.navigate(['/login']);
  }

  ngOnInit(): void {
   this.getUser();
   this.getRole();
   this.getId();
    
  }

}
