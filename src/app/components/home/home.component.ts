import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { MediaChange, ObservableMedia, FlexLayoutModule } from '@angular/flex-layout';

import { MoviesService, IMovie, Logger, AlertService } from '@app/services';

const log = new Logger('Login');

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public movies: IMovie[];
  public isLoading: boolean;
  public lastMovie: IMovie;

  constructor(
    private router: Router,
    public media: ObservableMedia,
    private alertService: AlertService,
    private moviesService: MoviesService,
  ) { }

  ngOnInit() {
    this.isLoading = true;

    this.moviesService.getAll().subscribe((movies: IMovie[]) => {
      this.lastMovie = movies[0];
      this.movies = movies.slice(1);
      this.isLoading = false;

      this.moviesService.getMovieImage(this.lastMovie).subscribe((image: any) => {
        this.lastMovie.imageData = image;
      }, (error: any) => {
        log.error(error);
        this.alertService.showAlert();
      });
    });
  }

  movieSelected(movie: IMovie) {
    this.router.navigate(['detail', movie.id]);
  }
}
