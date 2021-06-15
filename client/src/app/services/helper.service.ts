import { Injectable } from '@angular/core';
import { CategoryDetailComponent } from '../category/category-detail/category-detail.component';
import { Pays } from '../models/pays';
import { CategoryService } from './category.service';

@Injectable({
  providedIn: 'root'
})
export class HelperService {

  constructor(private categoryService:CategoryService) { }

  getCategories=()=>{
    return this.categoryService.getCategories();
  }

  getCounties=():Observable<Pays[]>=>{
    return this.http.get<Pays[]>(this.baseUrl, {'headers':this.headers})
            .pipe(catchError(this.errorHandler));
  }
}
