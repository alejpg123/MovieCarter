import { Component, Input } from '@angular/core';
import { IMovies } from '../../movies';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-movies',
  standalone: true,
  imports: [RouterModule],
  template: `
  <section [routerLink]="['/details/', movies.id]">
    <img [src]="movies.portada" alt="Portada de {{ movies.nombre }}">
    <h2>{{ movies.nombre }}</h2>
  </section>
  `,
  styleUrl: './movies.component.css'
})
export class MoviesComponent {
  @Input() movies!: IMovies;
}
