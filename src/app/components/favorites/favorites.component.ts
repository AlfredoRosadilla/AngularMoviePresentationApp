import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { IMovie, MoviesService } from '@app/services';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss']
})
export class FavoritesComponent implements OnInit {
  public movies: IMovie[] = null;
  public isLoading: boolean = true;

  constructor(
    private router: Router,
    private moviesService: MoviesService
  ) { }

  ngOnInit() {
    this.moviesService.getAll().subscribe((movies: IMovie[]) => {
      this.movies = movies.filter((movie: IMovie) => Boolean(movie.favorite));
      this.isLoading = false;
    })
  }

  movieSelected(movie: IMovie) {
    this.router.navigate(['detail', movie.id]);
  }
}
