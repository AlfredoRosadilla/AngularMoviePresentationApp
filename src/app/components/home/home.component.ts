import { Component, OnInit } from '@angular/core';

import { MoviesService, IMovie } from '@app/services';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public isLoading: boolean;
  public movies: IMovie[];

  constructor(private moviesService: MoviesService) { }

  ngOnInit() {
    this.isLoading = true;

    this.moviesService.getAll().subscribe((movies: IMovie[]) => {
      this.movies = movies;
      this.isLoading = false;
    })
  }
}
