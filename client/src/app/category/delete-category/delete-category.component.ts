import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Category } from 'src/app/models/category';
import { CategoryComponent } from '../category.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-delete-category',
  templateUrl: './delete-category.component.html',
  styleUrls: ['./delete-category.component.css']
})
export class DeleteCategoryComponent implements OnInit {
  categorySelected:Category|any;
  constructor(private route:ActivatedRoute,
    private router:Router, 
    private categoryService:CategoryComponent,
    private location:Location) { }

  ngOnInit(): void {
    const idSting=this.route.snapshot.paramMap.get('id')||'10';
    const id =parseInt(idSting);
    //this.categorySelected=this.categoryService.findOne(id);
    //this.categoryService.delete(id);
       
  }
  
  goBack=()=>{
    return this.location.back();
  }

  

}
