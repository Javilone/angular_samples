import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-search',
  standalone: true, // Esto lo agregué yo manualmente
  imports: [],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css',
})
export class SearchComponent {
  @Input() ph = 'placeholder';
  @Input() label = 'Buscar';
  // El uso de @Input abre las puertas a poder estar esas propiedades desde
  // otros componentes. De no usarlo, la propiedad estaría limitada al uso local
  // dentro del propio componente.

  name = 'Joe';
  updatedName = 'Ramón';

  @Output() clickEnLupa: EventEmitter<string> = new EventEmitter();
  @Output() otroEvento = new EventEmitter();

  myFunction() {
    console.log(`Valor del input:${this.updatedName}`);
    this.name = this.updatedName;
  }

  nameUpdated($event: any) {
    this.updatedName = $event.target.value;
  }

  resetName() {
    this.name = '';
    this.updatedName = '';
  }

  clickEvent() {
    console.log('click en lupa');
    this.clickEnLupa.emit('evento custom desde search');
  }
}
