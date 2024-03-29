import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Category } from 'src/app/models/category';
import { AuthService } from 'src/app/services/auth.service';
import { CategoryComponent } from '../category.component';

@Component({
  selector: 'app-category-add-edit',
  templateUrl: './category-add-edit.component.html',
  styleUrls: ['./category-add-edit.component.css']
})
export class CategoryAddEditComponent implements OnInit {
  @Input() categoryDetail:Category | any;
  constructor(private authService:AuthService, private router:Router, private catService:CategoryComponent){
    if(!authService.isLoggedIn){ 
      authService.logOut();
      router.navigate(['/login']);
    };
  }

  onSubmit=(formCat:Category)=>{
    return this.catService.create(formCat);

  }

  ngOnInit(): void {
    this.catService.findAll();
  }

}
