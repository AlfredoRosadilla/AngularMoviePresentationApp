import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Route, extract } from '@app/services';
import { SearchComponent } from './search.component';

const routes: Routes = [
  Route.withShell([
    { path: 'search', component: SearchComponent, data: { title: extract('Search') } }
  ])
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class SearchRoutingModule { }
