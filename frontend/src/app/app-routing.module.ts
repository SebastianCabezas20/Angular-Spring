import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VideogameComponent } from './videogame/videogame.component';
import { DetailVideogameComponent } from './detail-videogame/detail-videogame.component';
import { CreateVideogameComponent } from './create-videogame/create-videogame.component';

const routes: Routes = [
  {path: '', redirectTo: '/videogames', pathMatch: 'full' },
  {path: 'videogames', component: VideogameComponent},
  {path: 'videogame/:id', component: DetailVideogameComponent},
  {path: 'create/videogame', component: CreateVideogameComponent},


  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
