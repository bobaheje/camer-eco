/* eslint-disable no-invalid-this */
/* eslint-disable no-console */
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private loginService:LoginService) { }
  
  onSubmit=(credentials:NgForm)=>{
    this.loginService.login(credentials)
        .subscribe(result=>{
          if(result)
          {
            console.log('OK');
          }
          else{
            console.log('NOT OK');
          }
        });
  }

  ngOnInit(): void {
  }

}
