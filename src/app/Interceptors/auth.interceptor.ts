import { HttpClient, HttpErrorResponse, HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from "ngx-cookie-service";
import { Observable, throwError } from 'rxjs';
import {Router} from "@angular/router";
import {catchError} from "rxjs/operators";
import { AppSettings } from '../Config/constants'
import * as CryptoJS from 'crypto-js';  
import { User} from '../Models/user.model';
import { SessionService } from '../Service/Session/session.service';


@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private cookieService: CookieService, private router: Router, private httpClient : HttpClient, private sessionService: SessionService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    var user : User = this.sessionService.getCurrentUser();
    console.log("intercept");
    console.log(req.headers.get('Anonymous'));
    if(req.headers.get('Anonymous') != '') {
      const token = user.token;
      var expirationDate=  new Date(user.expiration_date);
      var today= new Date();
      if (token && expirationDate.getTime() - today.getTime() > 0) {
        const headers = req.clone({
          headers: req.headers.set('auth-token',this.sessionService.getCurrentUser().token)
        });
        return next.handle(headers);
        
      }else if(token && expirationDate.getTime() - today.getTime() < 0){
        this.refreshToken().subscribe(result=>{
          
          this.sessionService.setUser(result);
          const headers = req.clone({
            headers: req.headers.set('auth-token',result.token)
          });
          return next.handle(headers);

        })

      }
    }else{
      const headers = req.clone({
        headers: req.headers.set('auth-token','')
      });
      return next.handle(headers);
    }  
    
    
    return next.handle(req).pipe(
      catchError((err: HttpErrorResponse) => {

        if (err.status === 401 ) {
          this.router.navigate(['/login']);
        }
        return throwError(err);

      })
    );
  }

  refreshToken( ){
    var pass= CryptoJS.AES.decrypt( this.sessionService.getCurrentUser().pass,AppSettings.SECRET_KEY).toString(CryptoJS.enc.Utf8);
    return this.httpClient.post<User>(`${ AppSettings.API_ENDPOINT}/login/login`,{user: this.sessionService.getCurrentUser().user, password: pass});
  }
}