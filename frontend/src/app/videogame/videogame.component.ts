import { Component, OnInit } from '@angular/core';
import { Videogame } from '../videogame';
import { VideogameService } from '../videogame.service';
import { interval, pipe, timeInterval } from 'rxjs';

@Component({
  selector: 'app-videogame',
  templateUrl: './videogame.component.html',
  styleUrls: ['./videogame.component.css'],
})
export class VideogameComponent implements OnInit {
  videogameList!: Videogame[];
  videoDelete!: Videogame;
  viewDelete: boolean = false;

  constructor(private videojuegoService: VideogameService) {}

  ngOnInit() {
    this.getDataVideogames();
  }

  getDataVideogames() {
    this.videojuegoService.getVideogames().subscribe((videojuegos) => {
      this.videogameList = videojuegos;
    });
  }

  delete(videogame: Videogame) {
    let option = confirm('Estas seguro de eliminar ' + videogame.name);

    if (option) {
      this.videojuegoService.deleteVideogame(videogame.id).subscribe((p) => {
        this.videoDelete = p;
        this.videogameList = this.videogameList.filter(
          (game) => game.id != this.videoDelete.id
        );
        this.alertDelete();
      });
    }
  }

  alertDelete() {
    this.viewDelete = true;
    const seconds = interval(4000);
    seconds.pipe(timeInterval()).subscribe(() => (this.viewDelete = false));
  }

  search(busqueda: string) {
    this.videojuegoService
      .search(busqueda)
      .subscribe((video: Videogame[]) => (this.videogameList = video));
  }
}
