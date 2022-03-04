import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { Tema } from '../models/Tema';
import { TemaService } from '../services/tema.service';

@Component({
  selector: 'app-tema',
  templateUrl: './tema.component.html',
  styleUrls: ['./tema.component.css']
})
export class TemaComponent implements OnInit {

  tema: Tema = new Tema();
  listaTemas: Tema[];

  constructor(private router: Router, private temaService: TemaService) {

  }

  ngOnInit() {
    if (environment.token == '') {
      // alert("Sua seção expirou, faça login novamente.");
      this.router.navigate(["/entrar"]);
    }

    this.findAllTemas();
  }

 findAllTemas(){
   this.temaService.getAllTemas().subscribe((resp: Tema[]) => {
    this.listaTemas = resp;
   })
 } 

  cadastrarTema(){
    // console.log(environment.token);
    this.temaService.postTema(this.tema).subscribe((resp: Tema) => {
      this.tema = resp;
      alert("Tema cadastrado com sucesso!");
      this.findAllTemas();
      this.tema = new Tema();
    })
  }

}
