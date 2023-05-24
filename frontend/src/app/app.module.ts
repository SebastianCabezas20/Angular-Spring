import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { VideogameComponent } from './videogame/videogame.component';
import { DetailVideogameComponent } from './detail-videogame/detail-videogame.component';
import { CreateVideogameComponent } from './create-videogame/create-videogame.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    VideogameComponent,
    DetailVideogameComponent,
    CreateVideogameComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
