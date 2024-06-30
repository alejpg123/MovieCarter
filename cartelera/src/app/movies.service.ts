import { Injectable } from '@angular/core';
import { IMovies } from '../movies'

@Injectable({
  providedIn: 'root'
})
export class MoviesService {
  url = 'http://localhost:3000/movies';
  constructor() { }
  async getAllMovies(): Promise<IMovies[]> {
    const data = await fetch(this.url);
    const movies = await data.json() ?? [];
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(movies);
      }, 300)
    })
  }

  async getMovieById(id: Number): Promise<IMovies> {
    const data = await fetch(`${this.url}/${id}`);
    return await data.json() ?? {};
  }
  async submitApplication(nombre: string, apellido: string, ciudad: string, mail: string){
    alert(JSON.stringify({ nombre, apellido, ciudad, mail }))
  }
}
