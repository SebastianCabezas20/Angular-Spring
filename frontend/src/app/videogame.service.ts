import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';
import { Videogame } from './videogame';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class VideogameService {
  constructor(private http: HttpClient) {}

  getVideogames(): Observable<Videogame[]> {
    return this.http.get<Videogame[]>('http://localhost:8080/videogame/get');
  }

  getVideogameById(id: string): Observable<Videogame> {
    return this.http.get<Videogame>(
      `http://localhost:8080/videogame/get/id?id=${id}`
    );
  }

  postVideogame(videogame: Videogame) {
    console.log('Creando videojuego');
    return this.http.post<Videogame>(
      `http://localhost:8080/videogame/create`,
      videogame
    );
  }

  patchVideogame(videogame: Videogame) {
    console.log('Actualizando un videojuego');
    console.log(videogame);
    return this.http.patch<Videogame>(
      `http://localhost:8080/videogame/update/id`,
      videogame
    );
  }

  deleteVideogame(id: String): Observable<any> {
    console.log('Eliminando videojuego');
    return this.http.delete(
      `http://localhost:8080/videogame/delete/id?id=${id}`
    );
  }
}
