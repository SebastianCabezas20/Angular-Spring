import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { VideogameComponent } from './videogame/videogame.component';
import { DetailVideogameComponent } from './detail-videogame/detail-videogame.component';
import { CreateVideogameComponent } from './create-videogame/create-videogame.component';
import { ReactiveFormsModule } from '@angular/forms';
import { PageButtonsComponent } from './page-buttons/page-buttons.component';
import { DropdownPageComponent } from './dropdown-page/dropdown-page.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    VideogameComponent,
    DetailVideogameComponent,
    CreateVideogameComponent,
    PageButtonsComponent,
    DropdownPageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
