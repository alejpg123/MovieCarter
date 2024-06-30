import { Component, inject } from '@angular/core';
import { IMovies } from '../../movies';
import { MoviesService } from '../movies.service';
import { MoviesComponent } from '../movies/movies.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MoviesComponent],
  template: `
  <section>
    <form>
      <input type="search" placeholder="Buscar película" #filter />
      <button
        type="button"
        (click)="filterResults(filter.value)"
      >
        Buscar
      </button>
    </form>
  </section>
  <section class="movies-container">
    @if(!moviesList.length){
      <span>Cargando...</span>
    }
    @for(movie of filteredMoviesList; track movie.id) {
      <app-movies [movies]="movie" />
    }
  </section>

  `,
  styleUrl: './home.component.css'
})
export class HomeComponent {
  moviesService: MoviesService = inject(MoviesService);
  moviesList: IMovies[] = [];
  filteredMoviesList: IMovies[] = [];
  constructor(){
    this.moviesService
    .getAllMovies()
    .then((moviesList: IMovies[]) => {
      this.moviesList = moviesList;
      this.filteredMoviesList = moviesList;
    });
  }
  filterResults(text: string) {
  if (!text) {
    this.filteredMoviesList = this.moviesList;
  }
  this.filteredMoviesList = this.moviesList.filter((movie) =>
  movie?.nombre.toLowerCase().includes(text.toLowerCase())
  );
  }
}

