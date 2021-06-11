/* eslint-disable no-useless-concat */
/* eslint-disable no-invalid-this */
import { Component, Input, OnInit } from '@angular/core';
import { Category } from '../models/category';
import { CategoryService } from '../services/category.service';
import Swal from 'sweetalert2';
import { Observable } from 'rxjs';

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
 
  onDelete =(cat:Category)=>{
    
    Swal.fire({
      title:'Deletion',
      text:`Are you sure want to remove  ${cat.category} ?`,
      icon:'warning',
      showCancelButton:true,
      confirmButtonText:'Yes delete it',
      cancelButtonText:'No keep it'
    })
    .then((result)=>{
      
      if(result.value){
        
        this.categoryService.deleteCategory(cat.id).subscribe(()=>this.ngOnInit());
        Swal.fire(
          'Deleted',
          ` ${cat.category} has been deleted`,
          'success'
        );
      }
      else if ((result.dismiss === Swal.DismissReason.cancel)){
        Swal.fire(
          'Cancelled',
          `${cat.category} is safe`,
          'error'
        );
      }
    });

   
  }

  update= (id:number, category:Category)=>{
    return this.categoryService.updateCategory(id, category);
  
  }

  onSelectEdit=(cat:Category)=>{
    
    this.category=cat;
    
  }
  

  ngOnInit(): void {
      this.findAll();
  }

}
