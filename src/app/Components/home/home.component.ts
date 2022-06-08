import { Component, OnInit } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router'
import { AppSettings } from '../../Config/constants'
import {SessionService} from '../../Service/Session/session.service'
import { User} from '../../Models/user.model';

export interface subMenu {
  text: string;
  link: string;
  acces: number
}

export interface itemMenu {
  text: string;
  acces: number;
  icon: string,
  child?: subMenu[]
}


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  state: string;
  step = 0;
  menuItems: itemMenu[]; 
  user: User;
  constructor( private httpClient : HttpClient,  private session: SessionService, private router: Router) {
    this.user = this.session.getCurrentUser();
    console.log(this.user);
    this.menuItems = [
      {
        text:'Nuevos', acces:1, icon: 'directions_car' ,child: [
          {text: 'Registro de visitas', link:'turns', acces: this.session.getPermission('COMERCIAL',AppSettings.PERMISSION_COMERCIAL.Turnos.index)},
          {text: 'Turnos', link:'view', acces: this.session.getPermission('COMERCIAL',AppSettings.PERMISSION_COMERCIAL.Visitas.index) }
        ] 
      },
    ];
  }

  ngOnInit(): void {
  }

  ChangeState(state: string){
    console.log("entro state");
    this.httpClient.post(`${AppSettings.API_ENDPOINT}/api/state`,{user: this.session.getCurrentUser().user, state: state}).subscribe(res=>{
      console.log(res);
      this.session.setStateUser(state);
      this.state= state;
      console.log(this.state);
    })
  }

  closeSession(){
    this.session.Logout();
    this.router.navigate(['/login']);
  }

  TurnsState(state: string){
    this.httpClient.post(`${AppSettings.API_ENDPOINT}/api/stateTurn`,{user: this.session.getUsername(), state: state}).subscribe(res=>{
      console.log(res);
    })
  }
}
