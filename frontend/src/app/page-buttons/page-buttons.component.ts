import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { Pagina } from '../pagina';

@Component({
  selector: 'app-page-buttons',
  templateUrl: './page-buttons.component.html',
  styleUrls: ['./page-buttons.component.css'],
})
export class PageButtonsComponent implements OnChanges {
  @Input() medidaPagina!: number;
  @Input() documentosTotales!: number;
  paginas!: Pagina[];
  @Output() OnClick = new EventEmitter<Pagina>();

  ngOnChanges(changes: SimpleChanges) {
    if (changes['documentosTotales']) {
      this.generacionPaginas();
    }
  }

  generacionPaginas() {
    this.paginas = [];
    var max: number = 0;
    for (
      let index = 0;
      index < this.documentosTotales / this.medidaPagina;
      index++
    ) {
      this.paginas.push({
        numero: index + 1,
        maximo: max + this.medidaPagina,
        minimo: max,
      } as Pagina);
      max = max + this.medidaPagina;
    }
  }

  onClickPage(page: Pagina) {
    this.OnClick.emit(page);
  }
}
