/* eslint-disable no-invalid-this */
/* eslint-disable no-console */
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  baseUrl='http://localhost:1500/api/v1/users';
  headers:HttpHeaders;
  constructor(private http:HttpClient) { 
    const Token=localStorage.getItem('token');
   
    this.headers=new HttpHeaders()
    .set('content-type', 'application/json')
    .set('Access-Control-Allow-Origin', '*')
    .set('Accept', '*/*')
    .set('Authorization', `${Token}`);

  }

  

  getUsers=():Observable<User[]>=>{
    return this.http.get<User[]>(this.baseUrl, {'headers':this.headers})
            .pipe(catchError(this.errorHandler));
  }

  getUserById=(id:number):Observable<User>=>{
    return this.http.get<User>(`${this.baseUrl}/${id}`, {'headers':this.headers})
          .pipe(catchError(this.errorHandler));
  }

  getUserBySlug=(slug:string):Observable<User>=>{
    return this.http.get<User>(`${this.baseUrl}/${slug}`, {'headers':this.headers})
          .pipe(catchError(this.errorHandler));
  }

  createUser=(user:User):Observable<User>=>{
    return this.http.post<User>(this.baseUrl, JSON.stringify(user), {'headers':this.headers})
          .pipe(catchError(this.errorHandler));
  }

  deleteUser=(id:number):Observable<User>=>{
    return this.http.delete<User>(`${this.baseUrl}/${id}`, {'headers':this.headers});
  }

  updateUser=(id:number, user:User):Observable<User>=>{
    return this.http.put<User>(`${this.baseUrl}/${id}`, JSON.stringify(user), {'headers':this.headers});
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
