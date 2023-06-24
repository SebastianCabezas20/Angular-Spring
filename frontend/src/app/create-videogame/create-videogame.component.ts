import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Videogame } from '../videogame';
import { VideogameService } from '../videogame.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-create-videogame',
  templateUrl: './create-videogame.component.html',
  styleUrls: ['./create-videogame.component.css'],
})
export class CreateVideogameComponent implements OnInit {
  form!: FormGroup;
  imageUrl!: string;

  ngOnInit(): void {
    this.form = new FormGroup({
      nombre: new FormControl('', [Validators.required]),
      plataforma: new FormControl('', [Validators.required]),
      genero: new FormControl('', [Validators.required]),
      desarrollador: new FormControl('', [Validators.required]),
      año: new FormControl('', [
        Validators.required,
        Validators.max(2023),
        Validators.min(1900),
      ]),
      ventas: new FormControl('', [Validators.required]),
      rating: new FormControl('', [
        Validators.required,
        Validators.maxLength(2),
      ]),
    });
  }
  constructor(
    private serviceVideogame: VideogameService,
    private location: Location
  ) {}

  clear() {
    this.form.reset();
  }

  Onsubmit() {
    this.serviceVideogame.postVideogame(this.save()).subscribe({
      next: () => {
        alert('Videojuego Creado');
        this.clear();
        this.location.back();
      },
      error: () => {
        alert(
          'No se puede crear un videouego en este momento. Intentelo más tarde'
        );
      },
    });
  }

  mostrar(event: any) {
    const file: File = event.target.files[0];
    const reader: FileReader = new FileReader();

    reader.onload = (e: any) => {
      this.imageUrl = e.target.result;
    };

    reader.readAsDataURL(file);
  }

  save(): Videogame {
    return {
      name: this.form.get('nombre')?.value,
      platform: this.form.get('plataforma')?.value,
      genre: this.form.get('genero')?.value,
      developer: this.form.get('desarrollador')?.value,
      global_Sales: this.form.get('ventas')?.value,
      year_of_Release: this.form.get('año')?.value,
      rating: this.form.get('rating')?.value,
      url: this.imageUrl,
    } as Videogame;
  }
}
