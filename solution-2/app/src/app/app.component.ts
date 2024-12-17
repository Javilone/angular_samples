import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SearchComponent } from './utils/search/search.component';
import { UserListComponent } from './user/user-list/user-list.component';
import { NgFor } from '@angular/common';
import { MenuComponent } from './layout/menu/menu.component';

@Component({
  selector: 'app-root',
  standalone: true, // Esta linea la agregué yo
  imports: [
    RouterOutlet,
    SearchComponent,
    UserListComponent,
    MenuComponent,
    NgFor,
  ], // Aquí agrego los módulos que voy creando para importarlos y hacerlos funcionar
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'app';

  fruits = ['banana', 'apple', 'orange'];

  writeLog($event: string) {
    console.log('Click en Lupa detectado!!!');
    console.log($event);
  }
}
