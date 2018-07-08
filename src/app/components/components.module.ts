import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeModule } from './home/home.module';
import { LoginModule } from './login/login.module';
import { SearchModule } from './search/search.module';
import { FavoritesModule } from './favorites/favorites.module';
import { MovieDetailModule } from './movie-detail/movie-detail.module';
import { UserProfileModule } from './user-profile/user-profile.module';

@NgModule({
  imports: [
    CommonModule,

    HomeModule,
    LoginModule,
    SearchModule,
    FavoritesModule,
    MovieDetailModule,
    UserProfileModule,
  ],
  declarations: [],
  exports: [
    HomeModule,
    LoginModule,
    SearchModule,
    FavoritesModule,
    MovieDetailModule,
    UserProfileModule,
  ]
})
export class ComponentsModule { }
