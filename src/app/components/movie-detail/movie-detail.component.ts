import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { IMovie, MoviesService, Logger } from '@app/services';

const log = new Logger('Login');

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.scss']
})
export class MovieDetailComponent implements OnInit {
  private id: number = null;
  public movie: IMovie = null;
  public isLoading: boolean = true;

  constructor(
    private moviesService: MoviesService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: any) => {
      this.id = +params['id'];

      if (this.id) {
        this.moviesService.getById(this.id).subscribe((movie: IMovie) => {
          this.movie = movie;
          this.isLoading = false;

          this.moviesService.getMovieImage(movie).subscribe((imageData: string) => {
            this.movie.imageData = imageData;
          }, (error: any) => {
            log.error(error);
          })
        }, (error: any) => {
          log.error(error);
        })
      }
    })
  }
}
