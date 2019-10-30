import { Injectable } from '@angular/core';
import {Subject} from 'rxjs';
import {ArticleModule} from '../models/article/article.module';
import * as firebase from 'firebase';
import {formatDate} from "@angular/common";
import {Livre} from "../models/livre.model";

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  articles: ArticleModule[] = [];
  articlesSubject = new Subject<ArticleModule[]>();

  constructor() { }
  emitArticles() {
    this.articlesSubject.next(this.articles);
  }
  saveArticles() {
    firebase.database().ref('/articles').set(this.articles);
  }
  getArticles() {
    firebase.database().ref('/articles')
      .on('value', (data) => {
        this.articles = data.val() ? data.val() : [];
        this.emitArticles();
      });
  }
  getSingleArticle(id: number) {
    return new Promise(
      (resolve, reject) => {
        firebase.database().ref('/articles/' + id).once('value').then(
          (data) => {
            resolve(data.val());
          }, (error) => {
            reject(error);
          }
        );
      }
    );
  }
  createNewArticle(art: ArticleModule) {
    const currentUser = firebase.auth().currentUser;
    const dateNow = formatDate(new Date(), 'yyyy/MM/dd hh:mm', 'en');
    art.createBy = currentUser.email;
    art.dateCreate = dateNow;
    art.dateUpdate = dateNow;
    this.articles.push(art);
    this.saveArticles();
    this.emitArticles();
  }
  deleteArticle(idArt: number) {
    const art = this.articles[idArt];
    if (art.photo) {
      const storageRef = firebase.storage().refFromURL(art.photo);
      storageRef.delete().then(
        () => {
          console.log('Photo supprime avec success ');
        }
      ).catch(
        (error) => {
          console.log('Photo non touvee : ' + error);
        }
      );
    }
    const articleIndexToRemove = this.articles.findIndex(
      (article) => {
        if (article === art) {
          return true;
        }
      }
    );
    this.articles.splice(articleIndexToRemove, 1);
    this.saveArticles();
    this.emitArticles();
  }

  updateArticle(art: ArticleModule, idArticle: number) {
    art.createBy = firebase.auth().currentUser.email;
    art.dateUpdate = formatDate(new Date(), 'yyyy/MM/dd hh:mm', 'en');
    this.articles[idArticle] = art;
    this.saveArticles();
    this.emitArticles();
  }
}
