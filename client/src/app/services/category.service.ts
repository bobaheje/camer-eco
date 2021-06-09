/* eslint-disable no-console */
/* eslint-disable no-invalid-this */
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Category } from '../models/category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  baseUrl='http://localhost:1500/api/v1/categories';
  headers:HttpHeaders;
  constructor(private http:HttpClient) { 
    const Token=localStorage.getItem('token');
   
    this.headers=new HttpHeaders()
    .set('content-type', 'application/json')
    .set('Access-Control-Allow-Origin', '*')
    .set('Accept', '*/*')
    .set('Authorization', `${Token}`);
  }

  getCategories=():Observable<Category[]>=>{
    return this.http.get<Category[]>(this.baseUrl, {'headers':this.headers})
            .pipe(catchError(this.errorHandler));
  }


  getCategoryById=(id:number)=>{
    return this.http.get<Category>(`${this.baseUrl}/${id}`, {'headers':this.headers})
          .pipe(catchError(this.errorHandler));
  }

  getCategoryBySlug=(slug:string)=>{
    return this.http.get<Category>(`${this.baseUrl}/${slug}`, {'headers':this.headers})
          .pipe(catchError(this.errorHandler));
  }

  createCategory=(category:Category):Observable<Category>=>{
    return this.http.post<Category>(this.baseUrl, JSON.stringify(category), {'headers':this.headers})
          .pipe(catchError(this.errorHandler));
  }

  deleteCategory=(id:number)=>{
    return this.http.delete<Category>(`${this.baseUrl}/${id}`, {'headers':this.headers});
  }

  updateCategory=(id:number, category:Category)=>{
    return this.http.put<Category>(`${this.baseUrl}/${id}`, JSON.stringify(category), {'headers':this.headers});
  }


  errorHandler(error:any) {
    let errorMessage = '';
    if(error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
 }

}
