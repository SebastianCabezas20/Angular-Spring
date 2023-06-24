import { Component, OnInit } from '@angular/core';
import { Videogame } from '../videogame';
import { VideogameService } from '../videogame.service';
import { Pagina } from '../pagina';
import { ResponseInit } from '../response-init';

@Component({
  selector: 'app-videogame',
  templateUrl: './videogame.component.html',
  styleUrls: ['./videogame.component.css'],
})
export class VideogameComponent implements OnInit {
  videogameList: Videogame[] = [];
  error: boolean = false;
  //Numero de documentos totales en la base de datos
  numeroTotalDoc!: number;
  /// Numero de documentos por pagina
  numeroDocPagina: number = 10;

  viewDelete: boolean = false;
  viewLoader: boolean = true;

  constructor(private videojuegoService: VideogameService) {}

  ngOnInit() {
    this.getDataVideogames();
  }

  async getDataVideogames() {
    this.videojuegoService
      .getVideogames(0, this.numeroDocPagina)
      .pipe()
      .subscribe({
        next: (responseInit: ResponseInit) => {
          this.videogameList = responseInit.videojuegos;
          this.numeroTotalDoc = responseInit.numeroDocumentos;
        },
        error: () => {
          this.viewLoader = false;
          this.error = true;
        },
      });
  }

  delete(videogame: Videogame) {
    let option = confirm('Estas seguro de eliminar ' + videogame.name);

    if (option) {
      this.videojuegoService.deleteVideogame(videogame.id).subscribe({
        next: (p: Videogame) => {
          this.videogameList = this.videogameList.filter(
            (game) => game.id != p.id
          );
          this.viewDelete = true;
          setTimeout(() => (this.viewDelete = false), 4000);
        },
        error: () =>
          alert(
            'Problemas al borrar el videojuego, porfavor intente más tarde'
          ),
      });
    }
  }

  visible(): boolean {
    if (this.videogameList.length == 0) {
      return false;
    }
    return true;
  }

  paginaSeleccionada($event: Pagina) {
    this.videogameList = [];
    this.viewLoader = true;
    this.videojuegoService
      .getVideogames($event.minimo, this.numeroDocPagina)
      .subscribe({
        next: (response: ResponseInit) => {
          this.videogameList = response.videojuegos;
        },
        error: () => {
          this.viewLoader = false;
          this.error = true;
        },
      });
  }

  //BUSQUEDA CON PAGINACION
  search(busqueda: string) {
    this.videogameList = [];
    this.viewLoader = true;
    this.videojuegoService.search(busqueda).subscribe({
      next: (videojuegos) => {
        this.videogameList = videojuegos;
        if (this.videogameList.length == 0) {
          this.viewLoader = false;
        }
      },

      error: () => alert('Busqueda no disponible'),
    });
  }
}
