import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-dropdown-page',
  templateUrl: './dropdown-page.component.html',
  styleUrls: ['./dropdown-page.component.css'],
})
export class DropdownPageComponent {
  @Input() numero!: number;
  @Output() numeroTamanio = new EventEmitter<number>();

  cambiarCantidad($event: any) {
    this.numero = $event.target.value;
    this.numeroTamanio.emit(this.numero);
  }
}
