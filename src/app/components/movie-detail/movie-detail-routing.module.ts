import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Route, extract } from '@app/services';
import { MovieDetailComponent } from './movie-detail.component';

const routes: Routes = [
  Route.withShell([
    { path: 'detail/:id', component: MovieDetailComponent, data: { title: extract('Detail') } }
  ])
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class MovieDetailRoutingModule { }
