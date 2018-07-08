import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { IMovie, MoviesService, Logger, AlertService } from '@app/services';

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
  public isFavorite: boolean = true;

  constructor(
    private router: Router,
    private alertService: AlertService,
    private moviesService: MoviesService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: any) => {
      this.id = Number(params['id']);

      if (this.id) {
        this.moviesService.getById(this.id).subscribe((movie: IMovie) => {
          this.movie = movie;
          this.isLoading = false;
          this.isFavorite = movie.favorite;

          this.moviesService.getMovieImage(movie).subscribe((imageData: string) => {
            this.movie.imageData = imageData;
          }, (error: any) => {
            this.alertService.showAlert('error', {
              text: 'Error loading movie image',
              solution: 'Please contact an admin user',
              translate: ['text', 'solution']
            });
            log.error(error);
          })
        }, (error: any) => {
          log.error(error);
          this.alertService.showAlert('error', {
            text: 'Error loading movie data',
            solution: 'Please contact an admin user',
            translate: ['text', 'solution']
          }).then(() => {
            this.router.navigate(['home']);
          })
        })
      }
    })
  }

  setFavorite() {
    this.isFavorite = !this.isFavorite;
    this.movie.favorite = this.isFavorite;
    this.alertService.showAlert('success', {
      text: this.isFavorite ? 'Added to favorites' : 'Removed from favorites',
      translate: ['text']
    })
  }
}
