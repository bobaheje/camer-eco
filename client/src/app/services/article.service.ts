/* eslint-disable no-invalid-this */
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Route } from '@angular/compiler/src/core';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Article } from '../models/article';
import { AuthService } from './auth.service';
import { CategoryService } from './category.service';
import { PaysService } from './pays.service';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {
  baseUrl='http://localhost:1500/api/v1/articles';
  headers:HttpHeaders;
  constructor(
    private http:HttpClient,
    private categoryService:CategoryService,
    private paysService:PaysService,
    private authService:AuthService,
    private router:Router
    ) { 
    if(! this.authService.isLogIn()) {
      this.authService.logOut();
      this.router.navigate(['/login']);

    } 
    const Token=localStorage.getItem('token');
   
    this.headers=new HttpHeaders()
    .set('content-type', 'application/json')
    .set('Access-Control-Allow-Origin', '*')
    .set('Accept', '*/*')
    .set('Authorization', `${Token}`);
  }

  getCountries=()=>{
    return this.paysService.getCountries();
  }
  getcategories=()=>{
    return this.categoryService.getCategories();
  }
  getArticles=():Observable<Article[]>=>{
    return this.http.get<Article[]>(this.baseUrl, {'headers':this.headers})
            .pipe(catchError(this.errorHandler));
  }


  getArticleById=(id:number)=>{
    return this.http.get<Article>(`${this.baseUrl}/${id}`, {'headers':this.headers})
          .pipe(catchError(this.errorHandler));
  }

  getArticleBySlug=(slug:string)=>{
    return this.http.get<Article>(`${this.baseUrl}/${slug}`, {'headers':this.headers})
          .pipe(catchError(this.errorHandler));
  }

  createArticle=(article:Article):Observable<Article>=>{
    return this.http.post<Article>(this.baseUrl, JSON.stringify(article), {'headers':this.headers})
          .pipe(catchError(this.errorHandler));
  }

  deleteArticle=(id:number)=>{
    return this.http.delete<Article>(`${this.baseUrl}/${id}`, {'headers':this.headers});
  }

  updateArticle=(id:number, article:Article)=>{
    return this.http.put<Article>(`${this.baseUrl}/${id}`, JSON.stringify(article), {'headers':this.headers});
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
    // eslint-disable-next-line no-console
    //console.log(errorMessage);
    return throwError(errorMessage);
 }
}
