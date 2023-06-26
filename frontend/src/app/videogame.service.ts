import { Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Videogame } from './videogame';
import { HttpClient } from '@angular/common/http';
import { ResponseInit } from './response-init';

@Injectable({
  providedIn: 'root',
})
export class VideogameService {
  constructor(private http: HttpClient) {}

  //Numero sera el total de documentos y videogame, los maximos de documentos por pagina
  // Solo se use en el fetch inicial
  getVideogames(
    skip: number,
    max: number,
    busqueda: string
  ): Observable<ResponseInit> {
    return this.http.post<ResponseInit>('http://localhost:8080/videogame/get', {
      skip: skip,
      numeroPorPagina: max,
      busqueda: busqueda,
    });
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

  search(busqueda: string): Observable<any> {
    return this.http.get<Videogame[]>(
      `http://localhost:8080/videogame/get/name?name=${busqueda}`
    );
  }
}
