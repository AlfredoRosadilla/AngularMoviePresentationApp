import { Observable, forkJoin } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { MediaChange, ObservableMedia } from '@angular/flex-layout';

import { IMovie, MoviesService } from '@app/services';

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
    public media: ObservableMedia,
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
      console.error(error);
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
}
