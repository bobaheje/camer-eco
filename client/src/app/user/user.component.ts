/* eslint-disable no-invalid-this */
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from '../models/user';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  users:User[]=[];
  @Input() user:User|any;
  constructor(private route:ActivatedRoute, private userService:UserService) { }

  findAll=()=>{
    return this.userService.getUsers()
          .subscribe(data=>{
            this.users=data;
            
          });
  }
  create=(user:User)=>{
    return this.userService.createUser(user)
                .subscribe(data=>{
                  this.user=data;
                });
  }
  findOne=(id:number)=>{
    return this.userService.getUserById(id)
      .subscribe(data=>{
        this.user=data;
      });
  }

  findBySlug=(slug:string)=>{
    return this.userService.getUserBySlug(slug)
                .subscribe(data=>{
                  this.user=data;
                });

  }

  delete =(id:number)=>{
    return this.userService.deleteUser(id);
  }

  update= (id:number, user:User)=>{
    return this.userService.updateUser(id, user);
  
  }

  ngOnInit(): void {
    this.findAll();
  }

}
