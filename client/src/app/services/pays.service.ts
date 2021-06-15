/* eslint-disable no-invalid-this */
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Pays } from '../models/pays';

@Injectable({
  providedIn: 'root'
})
export class PaysService {

  baseUrl='http://localhost:1500/api/v1/pays';
  headers:HttpHeaders;
  constructor(private http:HttpClient) { 
    const Token=localStorage.getItem('token');
   
    this.headers=new HttpHeaders()
    .set('content-type', 'application/json')
    .set('Access-Control-Allow-Origin', '*')
    .set('Accept', '*/*')
    .set('Authorization', `${Token}`);
  }

  getCountries=():Observable<Pays[]>=>{
    return this.http.get<Pays[]>(this.baseUrl, {'headers':this.headers})
            .pipe(catchError(this.errorHandler));
  }


  getPaysById=(id:number)=>{
    return this.http.get<Pays>(`${this.baseUrl}/${id}`, {'headers':this.headers})
          .pipe(catchError(this.errorHandler));
  }

  getPaysBySlug=(slug:string)=>{
    return this.http.get<Pays>(`${this.baseUrl}/${slug}`, {'headers':this.headers})
          .pipe(catchError(this.errorHandler));
  }

  createPays=(Pays:Pays):Observable<Pays>=>{
    return this.http.post<Pays>(this.baseUrl, JSON.stringify(Pays), {'headers':this.headers})
          .pipe(catchError(this.errorHandler));
  }

  deletePays=(id:number)=>{
    return this.http.delete<Pays>(`${this.baseUrl}/${id}`, {'headers':this.headers});
  }

  updatePays=(id:number, Pays:Pays)=>{
    return this.http.put<Pays>(`${this.baseUrl}/${id}`, JSON.stringify(Pays), {'headers':this.headers});
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
