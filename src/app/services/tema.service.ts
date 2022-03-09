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

  getAllTemas(): Observable<Tema[]>{
    // URL local
    // return this.http.get<Tema[]>('http://localhost:8080/tema/buscar/tudo', this.token);

    // URL Heroku
    return this.http.get<Tema[]>('https://blog-josias.herokuapp.com/tema/buscar/tudo', this.token);
  }

  getByIdTema(id: number): Observable<Tema>{
    // URL local
    //return this.http.get<Tema>(`http://localhost:8080/tema/buscar/${id}`, this.token);

    // URL Heroku
    return this.http.get<Tema>(`https://blog-josias.herokuapp.com/tema/buscar/${id}`, this.token);
  }

  postTema(tema: Tema): Observable<Tema>{
    // URL local
    //return this.http.post<Tema>('http://localhost:8080/tema/salvar', tema, this.token);

    // URL Heroku
    return this.http.post<Tema>('https://blog-josias.herokuapp.com/tema/salvar', tema, this.token);
  }

  putTema(tema: Tema): Observable<Tema>{
    // URL local
    //return this.http.put<Tema>('http://localhost:8080/tema/atualizar', tema, this.token);

    // URL Heroku
    return this.http.put<Tema>('https://blog-josias.herokuapp.com/tema/atualizar', tema, this.token);
  }

  deleteTema(id: number){
    // URL local
    //return this.http.delete(`http://localhost:8080/tema/deletar/${id}`, this.token)

    // URL Heroku
    return this.http.delete(`https://blog-josias.herokuapp.com/tema/deletar/${id}`, this.token)
  }
  
}
