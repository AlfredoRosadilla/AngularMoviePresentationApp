import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Route, extract } from '@app/services';
import { UserProfileComponent } from './user-profile.component';

const routes: Routes = [
  Route.withShell([
    { path: 'account', component: UserProfileComponent, data: { title: extract('User Profile') } }
  ])
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class UserProfileRoutingModule { }
