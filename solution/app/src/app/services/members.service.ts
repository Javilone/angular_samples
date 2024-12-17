import { Injectable } from '@angular/core';
import { MemberEntity } from '../model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
}) // Instancia UNA SOLA VEZ un servicio (singleton)
export class MembersService {
  constructor(private http: HttpClient) {}

  getAll(): Observable<MemberEntity[]> {
    /* return fetch('https://api.github.com/orgs/lemoncode/members').then(
      (response) => response.json()
    ); */
    return this.http.get<MemberEntity[]>(
      'https://api.github.com/orgs/lemoncode/members'
    );
  }
}
