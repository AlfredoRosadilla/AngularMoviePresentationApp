import { filter } from 'rxjs/operators';
import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MediaChange, ObservableMedia } from '@angular/flex-layout';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';

import { IMovie, MoviesService, Logger, AlertService } from '@app/services';

const log = new Logger();

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  private currentView = '';
  private isFavorite = false;
  private movieId: number = null;
  private lastView: string = null;
  private isLoadingMovieData = false;

  constructor(
    public media: ObservableMedia,

    private router: Router,
    private location: Location,
    private alertService: AlertService,
    private moviesService: MoviesService,
    private activatedRoute: ActivatedRoute
) { }
  ngOnInit() {
    this.currentView = this.router.url;
    this.getFavorite();

    this.router.events.pipe(
      filter((event: any) => event instanceof NavigationEnd)
    ).subscribe(($event: any) => {
      this.lastView = this.currentView;
      this.currentView = $event.url;

      this.getFavorite();
    });
  }

  private getFavorite() {
    const params = this.activatedRoute.firstChild.params;

    if (this.isCurrentView('detail') && params && params['value']['id']) {
      this.movieId = Number(params['value']['id']);

      this.isLoadingMovieData = true;

      this.moviesService.getById(this.movieId).subscribe((movie: IMovie) => {
        this.isFavorite = movie.favorite;
        this.isLoadingMovieData = false;
      });
    }
  }

  isCurrentView(view: string): boolean {
    return this.currentView.startsWith(`/${view}`);
  }

  executeAction(description: string) {
    if (description === 'left-button') {
      if (this.isCurrentView('home')) {
        this.router.navigate(['favorites']);
      } else if (this.lastView) {
        this.location.back();
      } else {
        this.router.navigate(['home']);
      }
    } else if (description === 'right-button') {
      if (this.isCurrentView('detail')) {
        this.moviesService.setFavorite(this.movieId, !this.isFavorite).subscribe((isChanged: boolean) => {
          this.isFavorite = !this.isFavorite;
          this.alertService.showAlert('success', {
            text: this.isFavorite ? 'Added to favorites' : 'Removed from favorites',
            translate: ['text']
          });
        }, (error: any) => {
          this.alertService.showAlert();
          log.error(error);
        });
      }
    }
  }
}
