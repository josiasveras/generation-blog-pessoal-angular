import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserLogin } from '../models/UserLogin';
import { Usuario } from '../models/Usuario';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient
  ) { }

  entrar(userLogin: UserLogin): Observable<UserLogin>{
    // URL local
    // return this.http.post<UserLogin>('http://localhost:8080/usuario/logar', userLogin);

    // URL heroku
    return this.http.post<UserLogin>('https://blog-josias.herokuapp.com/usuario/logar', userLogin);
  }

  cadastrar(usuario: Usuario): Observable<Usuario>{
    // URL local
    // return this.http.post<Usuario>('http://localhost:8080/usuario/cadastrar', usuario);

    // URL Heroku
    return this.http.post<Usuario>('https://blog-josias.herokuapp.com/usuario/cadastrar', usuario);
  }

}
