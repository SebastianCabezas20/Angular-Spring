import { Component, OnInit } from '@angular/core';
import { Videogame } from '../videogame';
import { VideogameService } from '../videogame.service';

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
        this.videoDelete = p[0];
        console.log(this.videoDelete.id);
        this.videogameList = this.videogameList.filter(
          (game) => game.id != this.videoDelete.id
        );
      });
    }
  }
}
