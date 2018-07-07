import { Component, OnInit } from '@angular/core';

import { MoviesService, IMovie } from '@app/services';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public movies: IMovie[];
  public isLoading: boolean;
  public lastMovie: IMovie;

  constructor(private moviesService: MoviesService) { }

  ngOnInit() {
    this.isLoading = true;

    this.moviesService.getAll().subscribe((movies: IMovie[]) => {
      this.lastMovie = movies[0];
      this.movies = movies.slice(1);
      this.isLoading = false;
    })
  }
}
