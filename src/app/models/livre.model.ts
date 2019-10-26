import {Actor} from './actor.model';
import {Categorie} from './categorie.model';

export class Livre {
  constructor(
    public title: string,
    public description: string,
    public dateCreate: string,
    public dateUpdate: string,
    public createBy: string,
    public actor: Actor,
    public categorie: Categorie,
    public fichier: string,
    public photo: string) {}
}
