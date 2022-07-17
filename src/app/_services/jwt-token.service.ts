import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class JwtTokenService {
  constructor() {}

  get token() {
    return localStorage.getItem('jwt-token');
  }

  get hasToken() {
    if (localStorage.getItem('jwt-token')) {
      return true;
    } else {
      return false;
    }
  }

  logout() {
    localStorage.setItem('jwt-token', '');
  }
}
