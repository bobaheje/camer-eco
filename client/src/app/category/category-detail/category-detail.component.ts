/* eslint-disable no-invalid-this */
import { Location } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from 'src/app/models/category';
import { AuthService } from 'src/app/services/auth.service';
import { LoginService } from 'src/app/services/login.service';
import { CategoryComponent } from '../category.component';


@Component({
  selector: 'app-category-detail',
  templateUrl: './category-detail.component.html',
  styleUrls: ['./category-detail.component.css']
})
export class CategoryDetailComponent implements OnInit {
  @Input() categoryDetail:Category | any;
  constructor(private authService:AuthService, 
    private router:Router, 
    private catService:CategoryComponent,
    private route:ActivatedRoute,
    private location:Location
    ){

    if(!this.authService.isLoggedIn){ 
      this.authService.logOut();
      router.navigate(['/login']);
    }
  }

  onSubmit=(formCat:Category)=>{
    
    
    return this.catService.update(formCat.id, formCat).subscribe(()=>this.goBack());

  }

  ngOnInit(): void {
    this.catService.findAll();
  }
  goBack=()=>{
    this.location.back();
  }

}
