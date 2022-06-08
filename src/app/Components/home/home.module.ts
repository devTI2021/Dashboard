import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatSidenavModule} from '@angular/material/sidenav';
import { RouterModule, Routes } from '@angular/router';
import { TurnsComponent } from '../turns/turns.component';
import { ViewTurnsComponent } from '../view-turns/view-turns.component';
import { AutGuard } from '../../Config/guard/aut.guard';

const routes: Routes = [
  {
    path: '',
    canActivate: [AutGuard], 
    component: TurnsComponent
  },
  {
    path: 'turns',
    canActivate: [AutGuard], 
    component: TurnsComponent
  },
  {
    path: 'view',
    canActivate: [AutGuard],  
    component: ViewTurnsComponent
  }
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatSidenavModule,
    RouterModule.forChild(routes)
  ],
  exports: [ RouterModule]
})


export class HomeModule { }
