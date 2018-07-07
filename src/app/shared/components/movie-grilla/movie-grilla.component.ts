import {
  Input,
  Output,
  OnInit,
  Component,
  EventEmitter
} from '@angular/core';

import { IMovie } from '@app/services';

@Component({
  selector: 'app-movie-grilla',
  templateUrl: './movie-grilla.component.html',
  styleUrls: ['./movie-grilla.component.scss']
})
export class MovieGrillaComponent implements OnInit {
  @Input('data') movies: IMovie[] = null;
  @Input('isLoading') isLoading: boolean = true;

  @Output() selectMovie ?= new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  public movieSelected(movie: IMovie) {
    this.selectMovie.emit(movie);
  }
}
