import { Tema } from "./Tema";
import { Usuario } from "./Usuario";

export class Postagem {
    public idPostagem: number;
    public tituloPostagem: string;
    public textoPostagem: string;
    public dataPostagem: Date;
    public tema: Tema;
    public usuario: Usuario;
}