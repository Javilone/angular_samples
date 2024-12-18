import { Component } from '@angular/core';
import { MenuComponent } from './layout/menu/menu.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true, // Esta linea la agregué yo
  imports: [RouterOutlet, MenuComponent], // Aquí agrego los módulos que voy creando para importarlos y hacerlos funcionar
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'app';
}
