import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router'
import { AppSettings } from '../../Config/constants';
import {MatSnackBar} from '@angular/material/snack-bar';
import { SessionService } from '../../Service/Session/session.service';
import { User} from '../../Models/user.model';
import * as CryptoJS from 'crypto-js';  

export interface permission {
  modulo: string,
  permisos: string
}




@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  Form= new FormGroup({
    user: new FormControl('',Validators.required),
    password: new FormControl('',Validators.required),
  });
  constructor( private httpClient : HttpClient, private router: Router, private _snackBar: MatSnackBar, private sessionService: SessionService ) { }

  ngOnInit(): void {
  }

  Login(){
    var Header = new HttpHeaders({'Anonymous':''});
    this.httpClient.post<User>(`${AppSettings.API_ENDPOINT}/login/login`,{user: this.Form.controls['user'].value, password: this.Form.controls['password'].value},{headers: Header}).subscribe(res=>{
      
      if( res.code == 200){
        res.pass= CryptoJS.AES.encrypt(this.Form.controls['password'].value, AppSettings.SECRET_KEY).toString();
        console.log(res);
        this.sessionService.setUser(res);
        this.httpClient.post<permission[]>(`${AppSettings.API_ENDPOINT}/permission`,{rol: res.group}).subscribe(res=>{
          console.log(res);
          this.sessionService.setPermission(res);
          this.router.navigate(['/HomeComponent']);
        })
        
      }else if(res.code=500){
        this._snackBar.open( 'Credenciales incorrectas','OK',{duration: 1000});
      }

    })
  }
}
