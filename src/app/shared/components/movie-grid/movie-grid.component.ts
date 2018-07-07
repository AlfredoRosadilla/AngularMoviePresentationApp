import {
  Input,
  Output,
  OnInit,
  Component,
  EventEmitter
} from '@angular/core';
import { filter } from 'rxjs/operators';
import { MediaChange, ObservableMedia } from '@angular/flex-layout';

import { IMovie } from '@app/services';

@Component({
  selector: 'app-movie-grid',
  templateUrl: './movie-grid.component.html',
  styleUrls: ['./movie-grid.component.scss']
})
export class MovieGridComponent implements OnInit {
  @Input('data') movies: IMovie[] = null;
  @Input('isLoading') isLoading: boolean = true;

  @Output() selectMovie ?= new EventEmitter();

  public gridDistribution: number = 25;

  constructor(private media: ObservableMedia) {}

  ngOnInit() {
    this.setGridDistributionByScreen();

    this.media
        .asObservable()
        .pipe(filter((change: MediaChange) => (change.mqAlias !== 'xs' && change.mqAlias !== 'sm')))
        .subscribe(() => {
          this.setGridDistributionByScreen();
        });
  }

  ngOnChanges(changes: any) {
    if (changes.movies && changes.movies.currentValue instanceof Array) {
      switch(changes.movies.currentValue.length) {
        case 1:
          this.gridDistribution = 100;
          break;
        case 2:
          this.gridDistribution = 50;
          break;
        case 3:
          this.gridDistribution = 33;
          break;
        default:
          this.setGridDistributionByScreen();
      }
    }
  }

  private setGridDistributionByScreen() {
    if (this.media.isActive('md')) {
      this.gridDistribution = 33;
    } else if (this.media.isActive('xs')) {
      this.gridDistribution = 50;
    } else {
      this.gridDistribution = 25;
    }
  }

  public movieSelected(movie: IMovie) {
    this.selectMovie.emit(movie);
  }
}
