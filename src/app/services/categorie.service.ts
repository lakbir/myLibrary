import { Injectable } from '@angular/core';
import {Categorie} from '../models/categorie.model';
import {Subject} from 'rxjs';
import * as firebase from 'firebase';
import {formatDate} from '@angular/common';


@Injectable({
  providedIn: 'root'
})
export class CategorieService {
  categories: Categorie[] = [];
  categoriesSubject = new Subject<Categorie[]>();
  constructor() {}

  emitCategories() {
    this.categoriesSubject.next(this.categories);
  }
  saveCategories() {
    firebase.database().ref('/categories').set(this.categories);
  }
  getCategories() {
    firebase.database().ref('/categories')
      .on('value', (data) => {
        this.categories = data.val() ? data.val() : [];
        this.emitCategories();
      });
  }
  getSingleCategorie(id: number) {
    return new Promise(
      (resolve, reject) => {
        firebase.database().ref('/categories/' + id).once('value').then(
          (data) => {
            resolve(data.val());
          }, (error) => {
            reject(error);
          }
        );
      }
    );
  }
  createNewCategorie(newCategorie: Categorie) {
    newCategorie.createdBy = firebase.auth().currentUser.email;
    newCategorie.dateCreated = formatDate(new Date(), 'yyyy/MM/dd hh:mm', 'en');
    this.categories.push(newCategorie);
    this.saveCategories();
    this.emitCategories();
  }
  removeCategorie(cat: Categorie) {
    const categorieIndexToRemove = this.categories.findIndex(
      (catEl) => {
        if (catEl === cat) {
          return true;
        }
      }
    );
    this.categories.splice(categorieIndexToRemove, 1);
    this.saveCategories();
    this.emitCategories();
  }
  deleteCategorie(idCat: number) {
    this.categories.splice(idCat, 1);
    this.saveCategories();
    this.emitCategories();
  }
  updateCategorie(cat: Categorie, idCat: number) {
    cat.createdBy = firebase.auth().currentUser.email;
    cat.dateCreated = formatDate(new Date(), 'yyyy/MM/dd hh:mm', 'en');
    this.categories[idCat] = cat;
    this.saveCategories();
    this.emitCategories();
  }
}
