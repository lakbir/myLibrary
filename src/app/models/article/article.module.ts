import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {Categorie} from '../categorie.model';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class ArticleModule {
  public constructor(public id: number,
                     public title: string,
                     public article: string,
                     public dateCreate: string,
                     public dateUpdate: string,
                     public createBy: string,
                     public categorie: Categorie,
                     public photo: string) {}

}
