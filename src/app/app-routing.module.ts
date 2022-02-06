import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TurnsComponent } from './Components/turns/turns.component';

const routes: Routes = [
  {path: 'TurnsComponent', component: TurnsComponent},
  {path: '', redirectTo:'/TurnsComponent', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
