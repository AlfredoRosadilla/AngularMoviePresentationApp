import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeModule } from './home/home.module';
import { LoginModule } from './login/login.module';
import { SearchModule } from './search/search.module';
import { MovieDetailModule } from './movie-detail/movie-detail.module';
import { FavoritesComponent } from './favorites/favorites.component';

@NgModule({
  imports: [
    CommonModule,

    HomeModule,
    LoginModule,
    SearchModule,
    MovieDetailModule,
  ],
  declarations: [FavoritesComponent],
  exports: [
    HomeModule,
    LoginModule,
    SearchModule,
    MovieDetailModule,
  ]
})
export class ComponentsModule { }
