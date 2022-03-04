import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { Tema } from '../models/Tema';

@Injectable({
  providedIn: 'root'
})
export class TemaService {

  constructor(private http: HttpClient) { 

  }

  // Passando o token no HttpHeader para liberar url´s de usuário logado
  token = {
    headers: new HttpHeaders().set('Authorization', environment.token)
  }

  getAllTema(): Observable<Tema[]>{
    // URL local
    // return this.http.get<Tema[]>('http://localhost:8080/tema/buscar/tudo', this.token);

    // URL Heroku
    return this.http.get<Tema[]>('https://blog-josias.herokuapp.com/tema/buscar/tudo', this.token);
  }

  postTema(tema: Tema): Observable<Tema>{
    // URL local
    //return this.http.post<Tema>('http://localhost:8080/tema/salvar', tema, this.token);

    // URL Heroku
    return this.http.post<Tema>('https://blog-josias.herokuapp.com/tema/salvar', tema, this.token);
  }
  
}
