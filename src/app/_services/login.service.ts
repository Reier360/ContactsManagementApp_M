import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private readonly baseURL: string = environment.baseUrl;
  constructor(private httpClient: HttpClient) {}

  public login(username: string, password: string) {
    const userLogin = {
      username: username,
      password: password,
    };

    return this.httpClient.post(this.baseURL + '/api/login', userLogin);
  }
}
