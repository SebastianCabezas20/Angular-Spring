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
  /// Numero de documentos por pagina por defecto
  numeroDocPagina: number = 10;

  // Pagina actual
  paginaActual: Pagina = {
    numero: 1,
    minimo: this.numeroDocPagina,
  };

  busqueda: string = '';

  viewDelete: boolean = false;
  viewLoader: boolean = true;

  constructor(private videojuegoService: VideogameService) {}

  ngOnInit() {
    this.getDataVideogames();
  }

  async getDataVideogames() {
    this.videojuegoService
      .getVideogames(this.numeroDocPagina, this.busqueda)
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

  // Volver a cargar los documentos traer la cantidad actual y no cambiar la pagina donde esta
  delete(videogame: Videogame) {
    let option = confirm('Estas seguro de eliminar ' + videogame.name);

    if (option) {
      this.videojuegoService.deleteVideogame(videogame.id).subscribe({
        next: (p: Videogame) => {
          this.viewDelete = true;
          setTimeout(() => (this.viewDelete = false), 3000);
          // Si existen más de un elemento en la lista, se sigue en la misma pagina
          if (this.videogameList.length > 1) {
            this.numeroTotalDoc = this.numeroTotalDoc - 1;

            this.paginaSeleccionada(this.paginaActual);
          } else {
            // Caso contrario, al borrar el unico elemento se cambia de pagina
            // Si la pagina es 1 se devuelve error
            if (this.paginaActual.numero == 1) {
              this.videogameList = [];
              this.viewLoader = false;
            } else {
              // Pagina anterior
              this.paginaActual = {
                numero: this.paginaActual.numero - 1,
                minimo: this.paginaActual.minimo - this.numeroDocPagina,
              };
              this.numeroTotalDoc = this.numeroTotalDoc - 1;

              this.paginaSeleccionada(this.paginaActual);
            }
          }
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
    this.paginaActual = $event;
    this.viewLoader = true;
    this.videojuegoService
      .getVideogamesPage($event.minimo, this.numeroDocPagina, this.busqueda)
      .subscribe({
        next: (response: Videogame[]) => {
          this.videogameList = response;
          if (this.videogameList.length == 0) {
            this.viewLoader = false;
          }
        },
        error: () => {
          this.viewLoader = false;
          this.error = true;
        },
      });
  }

  // En cada busqueda se resetea el paginado
  search(busqueda: string) {
    this.busqueda = busqueda;
    this.videogameList = [];
    this.viewLoader = true;
    // Pasar el numero por pagina
    // Como es la primera debe ser 0 el minimo o skip
    this.videojuegoService
      .getVideogames(this.numeroDocPagina, this.busqueda)
      .subscribe({
        next: (videojuegos: ResponseInit) => {
          this.videogameList = videojuegos.videojuegos;
          this.numeroTotalDoc = videojuegos.numeroDocumentos;
          this.paginaActual = {
            numero: 1,
            minimo: this.numeroDocPagina,
          };
          if (this.videogameList.length == 0) {
            this.viewLoader = false;
          }
          /// Cambiar la cantidad maxima de documentos
          ///La cantidad por pagina queda fija
        },

        error: () => alert('Busqueda no disponible'),
      });
  }

  // Por cada cambio en el tamaño se resetea el paginado
  changeSize($numero: number) {
    // Nuevo numero por pagina, resetea el paginado
    this.numeroDocPagina = $numero;
    this.paginaActual = {
      numero: 1,
      minimo: this.numeroDocPagina,
    };
    // Volver la lista a 0
    this.videogameList = [];
    this.viewLoader = true;
    /// Salta 0 y devuelve el numero de documentos por pagina
    this.videojuegoService
      .getVideogames(this.numeroDocPagina, this.busqueda)
      .subscribe({
        next: (videojuegos: ResponseInit) => {
          this.videogameList = videojuegos.videojuegos;
        },
        error: () => {
          this.viewLoader = false;
          this.error = true;
        },
      });
  }

  enter(event: KeyboardEvent, searchValue: string) {
    if (event.key === 'Enter') {
      this.search(searchValue);
    }
  }
}
