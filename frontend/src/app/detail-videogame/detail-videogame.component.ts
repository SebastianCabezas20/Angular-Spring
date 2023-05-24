import { Component, OnInit } from '@angular/core';
import { Videogame } from '../videogame';
import { ActivatedRoute, Router } from '@angular/router';
import { VideogameService } from '../videogame.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';

@Component({
  selector: 'app-detail-videogame',
  templateUrl: './detail-videogame.component.html',
  styleUrls: ['./detail-videogame.component.css'],
})
export class DetailVideogameComponent implements OnInit {
  id: string = '';
  videogame!: Videogame;
  read: boolean = true;
  form!: FormGroup;

  constructor(
    private router: ActivatedRoute,
    private location: Location,
    private serviceVideogame: VideogameService
  ) {}

  ngOnInit() {
    this.getVideogameId(this.router.snapshot.paramMap.get('id'));
  }

  getVideogameId(id: string | null) {
    if (id != null) {
      this.serviceVideogame.getVideogameById(id).subscribe((video) => {
        this.videogame = video;
        this.form = new FormGroup({
          nombre: new FormControl(this.videogame.name, [Validators.required]),
          plataforma: new FormControl(this.videogame.platform, [
            Validators.required,
          ]),
          genero: new FormControl(this.videogame.genre, [Validators.required]),
          desarrollador: new FormControl(this.videogame.developer, [
            Validators.required,
          ]),
          año: new FormControl(this.videogame.year_of_Release, [
            Validators.required,
            Validators.max(2023),
            Validators.min(1800),
          ]),
          ventas: new FormControl(this.videogame.global_Sales, [
            Validators.required,
          ]),
          rating: new FormControl(this.videogame.rating, [
            Validators.required,
            Validators.maxLength(2),
          ]),
        });
      });
    }
  }

  update() {
    this.serviceVideogame
      .patchVideogame({
        id: this.videogame.id,
        name: this.form.get('nombre')?.value,
        genre: this.form.get('genero')?.value,
        platform: this.form.get('plataforma')?.value,
        developer: this.form.get('desarrollador')?.value,
        year_of_Release: this.form.get('año')?.value,
        rating: this.form.get('rating')?.value,
        global_Sales: this.form.get('ventas')?.value,
      } as Videogame)
      .subscribe();
  }

  delete(videogame: Videogame) {
    let option = confirm('Estas seguro de eliminar ' + videogame.name);

    if (option) {
      this.serviceVideogame.deleteVideogame(videogame.id).subscribe((p) => {
        this.location.back();
      });
    }
  }
}
