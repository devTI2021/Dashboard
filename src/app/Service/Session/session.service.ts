import { Injectable } from '@angular/core';
import { User} from '../../Models/user.model';
import { Permission} from '../../Models/permission.model';
import { permission } from 'src/app/Components/login/login.component';
import { CookieService } from 'ngx-cookie-service';
import {io, Socket} from 'socket.io-client';
import { AppSettings } from '../../Config/constants'

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  private currentUser: User;
  private stateUser: string = '';
  private permission : Permission = {};
  socket: Socket;

  constructor( private cookieService: CookieService) { }

  setUser( user: User){
    this.currentUser= user;
    this.cookieService.set('data-sesion',JSON.stringify(user));
  }

  getCurrentUser(){
    return this.currentUser;
  }

  getGroup(){
    return this.currentUser.group;
  }

  getUsername(){
    return this.currentUser.user;
  }

  getName(){
    return this.currentUser.name;
  }

  setPermission(userPer: permission[]){
    userPer.forEach(element =>{
      this.permission[element.modulo]=element.permisos;
    });
    this.cookieService.set('permission',JSON.stringify(this.permission));
  }

  getPermission(module: string, idPermission: number){
    return parseInt( this.permission[module][idPermission] );
  }

  getStateUser(){
    return this.stateUser;
  }

  setStateUser(state: string){
    this.stateUser= state;
  }

  isUserLoggedIn(){
    if(this.currentUser!= undefined){
      return true;
    }else{
      if( this.cookieService.get('data-sesion')){
        var user= JSON.parse(this.cookieService.get('data-sesion'));
        this.currentUser= { code: user.code, pass: user.pass, token: user.token, user: user.user, group: user.group, canal: user.canal, expiration_date: user.expiration_date, name: user.name, state: user.state};
        this.permission= JSON.parse(this.cookieService.get('permission'));
        return true;
      }
      return false;
    }
  }

  Logout(){
    this.currentUser= { code: 0, token: '', user: '', group: '', canal: '', expiration_date : '', pass: '', name: '', state: ''};
    this.stateUser= '';
    this.permission = {};
    this.cookieService.deleteAll();
    if(this.socket){ this.socket.disconnect();}
  }

  getSocket(){

    this.socket= io(AppSettings.SOCKET_ENDPOINT,{
      path: "/socket.io",
      transports: ["websocket"]
    });
    return this.socket;
  }
}
