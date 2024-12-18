import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  onLoginSuccess() {
    this.router.navigate(['users']);
  }

  // Esto es por si necesito pasar parámetros por navegación
  ngOnInit(): void {
    this.route.queryParams.subscribe((queryParams) => {
      console.log(queryParams);
    });
  }
}
