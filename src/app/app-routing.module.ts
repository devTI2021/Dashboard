import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TurnsComponent } from './Components/turns/turns.component';
import { ViewTurnsComponent } from './Components/view-turns/view-turns.component';
import { LoginComponent } from './Components/login/login.component';
import { HomeComponent } from './Components/home/home.component';
import { AutGuard } from './Config/guard/aut.guard';
const routes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },

  {
    path: 'login', 
    component: LoginComponent
  },
  
  {
    path: 'HomeComponent',
    canActivate: [AutGuard], 
    component: HomeComponent,
    children: [
      
      { path: '', loadChildren: () => import('./Components/home/home.module').then(x => x.HomeModule)}
    ] 
    
  }

  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
