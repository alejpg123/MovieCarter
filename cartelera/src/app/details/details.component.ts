import { Component, inject } from '@angular/core';
import { IMovies } from '../../movies';
import { MoviesService } from '../movies.service';
import { ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [ReactiveFormsModule],
  template: `
  @if(!movie){
    <p>Cargando...</p>
  }@else{
    <article>
  <img [src]="movie.portada" alt="Portada de {{ movie.nombre }}">
  <div>
    <h2>{{ movie.nombre }}</h2>
    <ul>
      <li>Género: {{ movie.genero }}</li>
      <li>Director: {{ movie.director }}</li>
      <li>Fecha de estreno: {{ movie.estreno }}</li>
      <li>Idiomas: {{ movie.idiomas }}</li>
      <li>Clasificación: {{ movie.clasificacion }}</li>
      <li>Duración: {{ movie.duracion }}</li>
    </ul>
    <p>{{ movie.sinopsis }}</p>
  </div>
</article>
<section>
  <h3>Dejanos tus datos que te enviamos los datos de las funciones en tu zona.</h3>
  <form [formGroup]="applyForm" (submit)="handleSubmit()">
    <label for="nombre">Nombre</label>
    <input type="text" id="nombre" formControlName="nombre">
    <span [hidden]="nombre.valid || nombre.untouched">Nombre es requerido.</span>

    <label for="apellido">Apellido</label>
    <input type="text" id="apellido" formControlName="apellido">
    <span [hidden]="apellido.valid || apellido.untouched">Apellido es requerido.</span>

    <label for="ciudad">Ciudad</label>
    <input type="text" id="ciudad" formControlName="ciudad">
    <span [hidden]="ciudad.valid || ciudad.untouched">Ciudad es requerida.</span>

    <label for="mail">Mail</label>
    <input type="text" id="mail" formControlName="mail">
    <span [hidden]="mail.valid || mail.untouched">
      @if(mail.errors?.['required']){Mail es requerido}
      @else{Formato de mail inválido}
    </span>

    <button type="submit" [disabled]="applyForm.invalid">Enviar</button>
  </form>
</section>

}
  `,
  styleUrl: './details.component.css'
})
export class DetailsComponent {
route: ActivatedRoute = inject(ActivatedRoute)
moviesService = inject(MoviesService);
movie: IMovies | undefined;
applyForm = new FormGroup({
  nombre: new FormControl('', Validators.required),
  apellido: new FormControl('', Validators.required),
  ciudad: new FormControl('', Validators.required),
  mail: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$')])

})
constructor(){
  const movieId = Number(this.route.snapshot.params['id'])
  this.moviesService.getMovieById(movieId)
  .then((movie)=> {
    this.movie = movie;
  })
}
get nombre() {
  return this.applyForm.get('nombre') as FormControl;
}
get apellido() {
  return this.applyForm.get('apellido') as FormControl;
}
get mail() {
  return this.applyForm.get('mail') as FormControl;
}
get ciudad() {
  return this.applyForm.get('ciudad') as FormControl;
}
handleSubmit() {
  if (this.applyForm.invalid) return
  this.moviesService.submitApplication(
    this.applyForm.value.nombre ?? '',
    this.applyForm.value.apellido ?? '',
    this.applyForm.value.ciudad ?? '',
    this.applyForm.value.mail ?? ''
  )
}
}
