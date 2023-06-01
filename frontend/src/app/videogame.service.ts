import { Injectable } from '@angular/core';
import {
  Observable,
  Subject,
  catchError,
  debounceTime,
  distinctUntilChanged,
  switchMap,
} from 'rxjs';
import { Videogame } from './videogame';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class VideogameService {
  private searchSubject = new Subject<string>();

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

  search(busqueda: string): Observable<Videogame[]> {
    return this.searchSubject.pipe(
      debounceTime(300),

      // ignore new term if same as previous term
      distinctUntilChanged(),

      // switch to new search observable each time the term changes
      switchMap((busqueda: string) => this.searchVideogame(busqueda))
    );
  }

  searchVideogame(busqueda: string): Observable<Videogame[]> {
    return this.http.get<Videogame[]>('http://localhost:8080/videogame/get');
  }
}
