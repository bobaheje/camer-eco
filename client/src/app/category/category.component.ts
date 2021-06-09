/* eslint-disable no-invalid-this */
import { Component, Input, OnInit } from '@angular/core';
import { Category } from '../models/category';
import { CategoryService } from '../services/category.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  
  @Input() category:Category|any;
  @Input() categories: Category[]=[];
  
  
  constructor(private categoryService:CategoryService) {}

  findAll=()=>{
    return this.categoryService.getCategories()
                .subscribe(data=>{
                  this.categories=data;
                });
  }

  create=(category:Category)=>{
    return this.categoryService.createCategory(category)
                .subscribe(data=>{
                  this.category=data;
                });
  }
  findOne=(id:number)=>{
    return this.categoryService.getCategoryById(id)
      .subscribe(data=>{
        this.category=data;
      });
  }

  findBySlug=(slug:string)=>{
    return this.categoryService.getCategoryBySlug(slug)
                .subscribe(data=>{
                  this.category=data;
                });

  }

  delete =(id:number)=>{
    return this.categoryService.deleteCategory(id);
  }

  update= (id:number, category:Category)=>{
    return this.categoryService.updateCategory(id, category);
  
  }




  ngOnInit(): void {
      this.findAll();
  }

}
