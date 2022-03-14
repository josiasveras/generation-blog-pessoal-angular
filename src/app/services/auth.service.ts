import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { UserLogin } from '../models/UserLogin';
import { Usuario } from '../models/Usuario';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  // Passando o token no HttpHeader para liberar url´s de usuário logado
  token = {
    headers: new HttpHeaders().set('Authorization', environment.token)
  }

  refreshToken(){
    this.token = {
      headers: new HttpHeaders().set('Authorization', environment.token)
    }
  }

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

  getByIdUsuario(id: number): Observable<Usuario>{
    // URL local
    // return this.http.get<Usuario>(`https://blog-josias.herokuapp.com/usuario/buscar${id}`);

    // URL Heroku
    return this.http.get<Usuario>(`https://blog-josias.herokuapp.com/usuario/buscar/${id}`, this.token);
  }

  logado() {
    let ok: boolean = false;

    if (environment.token != '') {
      ok = true;
    }

    return ok;
  }

}
