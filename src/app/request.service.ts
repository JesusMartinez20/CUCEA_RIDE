import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators'
import { throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  posts: any;
  url=environment.url

  constructor(private http: HttpClient) {}

  handleError(error: HttpErrorResponse){
    console.log(error.error);
    return throwError(error);
  }

  getPosts(URL: String){
    if(localStorage.getItem('token')){
      const headers = new HttpHeaders().append('Authorization',  ''+localStorage.getItem('token'));
      let url = this.url;
      url += URL;
      return this.posts = this.http.get(url,{headers: headers}).pipe(
        catchError(this.handleError)
        );
    }else{
      let url = this.url;
      url += URL;
      
      return this.posts = this.http.get(url);
    }
    
    
  }

  login(username: String, password: String) {
    let response= this.http.post(this.url+'/login.php', 
    {
      "matricula": username,
      "contrasena": password
    }).pipe(
      catchError(this.handleError)
      );
    return response
    //subscribe(val=>(console.log(val)));
  }

  postMethod(URL:any,data:any){
    if(localStorage.getItem('token')){
      const headers = new HttpHeaders().append('Authorization', localStorage.getItem('token')!);
      //headers.append('Content-Type', 'application/json'); 
      let url = this.url;
      url += URL;
      data.token=localStorage.getItem('token');
      //console.log(JSON.stringify(data))
      return this.http.post(url,data,{headers: headers}).pipe(
        catchError(this.handleError)
        );
      } else {
        let url = this.url;
        url += URL;
        return this.http.post(url,data).pipe(
          catchError(this.handleError)
          );
      }
  }

  putMethod(URL:any,data:any){
    if(localStorage.getItem('token')){
      const headers = new HttpHeaders().append('Authorization', localStorage.getItem('token')!);
      //headers.append('Content-Type', 'application/json'); 
      let url = this.url;
      url += URL;
      data.token=localStorage.getItem('token');
      console.log(JSON.stringify(data))
      return this.http.put(url,data,{headers: headers}).pipe(
        catchError(this.handleError)
        );
      } else {
        let url = this.url;
        url += URL;
        return this.http.put(url,data).pipe(
          catchError(this.handleError)
          );
      }
  }

  deleteMethod(URL:any,data:any){
    const headers = new HttpHeaders().append('Authorization' ,'bearer '+  localStorage.getItem('token'));
    let url = this.url;
    url += URL;
    //data=JSON.stringify(data)
    return this.http.delete(url,{headers: headers});
  }
}
