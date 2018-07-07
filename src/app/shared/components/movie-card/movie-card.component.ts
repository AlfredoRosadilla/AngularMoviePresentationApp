import {
  Input,
  Output,
  OnInit,
  Component,
  EventEmitter
} from '@angular/core';

import { IMovie, MoviesService } from '@app/services';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent implements OnInit {
  @Input('data') data: IMovie;

  @Output() select ?= new EventEmitter<IMovie>();

  public isLoading: boolean = true;

  constructor(private moviesService: MoviesService) { }

  ngOnInit() {
    if (this.data) {
      this.getImage();
    }
  }

  ngOnChange(changes: any) {
    if (changes.data && changes.data.currentValue) {
      this.getImage();
    }
  }

  private getImage() {
    this.moviesService.getMovieImage(this.data).subscribe((image: Blob) => {
      this.data.imageData = image;
      this.isLoading = false;
    }, (error: any) => {
      console.error(error);
    })
  }
}
