import { Router } from '@angular/router';
import { Observable, forkJoin } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { MediaChange, ObservableMedia } from '@angular/flex-layout';

import { IMovie, MoviesService, Logger, AlertService } from '@app/services';

const log = new Logger('Login');

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  private movies: IMovie[] = [];
  public filterMovies: IMovie[] = [];

  public genres: string[] = [];
  public inputValue: string = '';
  public isLoading: boolean = true;

  constructor(
    private router: Router,
    public media: ObservableMedia,
    private alertService: AlertService,
    public moviesService: MoviesService
  ) { }

  ngOnInit() {
    forkJoin([
      this.moviesService.getAll(),
      this.moviesService.getGenres()
    ]).subscribe((data: any[]) => {
      // Create searchCriteria formed by name, description and genres
      data[0].forEach((movie: IMovie) => {
        movie.searchCriteria = `${movie.name}|${movie.description}|${movie.genres.join('|')}`.toLowerCase();
      })

      this.movies = data[0];
      this.genres = data[1];
      this.filterMovies = data[0];

      this.isLoading = false;
    }, (error: any) => {
      this.alertService.showAlert();
      log.error(error);
    })
  }

  /**
  * Filter movies that match with @param criteria
  */
  search(criteria: string) {
    // Avoid the case when an user blur input and the method receive DOM element value
    if (typeof criteria === 'string') {
      this.filterMovies = this.movies.filter((movie: IMovie) => movie.searchCriteria.indexOf(criteria.toLowerCase()) !== -1);
    }
  }

  movieSelected(movie: IMovie) {
    this.router.navigate(['detail', movie.id]);
  }
}
