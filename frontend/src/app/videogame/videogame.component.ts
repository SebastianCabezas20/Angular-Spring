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

  busqueda: string = '';

  viewDelete: boolean = false;
  viewLoader: boolean = true;

  constructor(private videojuegoService: VideogameService) {}

  ngOnInit() {
    this.getDataVideogames();
  }

  async getDataVideogames() {
    this.videojuegoService
      .getVideogames(0, this.numeroDocPagina, this.busqueda)
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
      .getVideogames($event.minimo, this.numeroDocPagina, this.busqueda)
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

  //BUSQUEDA CON PAGINACION FALTANTE
  // En cada paginacion se resetea el paginado
  search(busqueda: string) {
    this.busqueda = busqueda;
    this.videogameList = [];
    this.viewLoader = true;
    // Pasar el numero por pagina
    // Como es la primera debe ser 0 el minimo o skip
    this.videojuegoService
      .getVideogames(0, this.numeroDocPagina, this.busqueda)
      .subscribe({
        next: (videojuegos: ResponseInit) => {
          console.log(videojuegos.numeroDocumentos);
          this.videogameList = videojuegos.videojuegos;
          console.log(videojuegos.numeroDocumentos);
          this.numeroTotalDoc = videojuegos.numeroDocumentos;
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
    this.numeroDocPagina = $numero;
    this.videogameList = [];
    this.viewLoader = true;
    /// Salta 0 y devuelve el numero de documentos por pagina
    this.videojuegoService
      .getVideogames(0, this.numeroDocPagina, this.busqueda)
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
}
