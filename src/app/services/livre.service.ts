import { Injectable } from '@angular/core';
import {BookModule} from '../models/book.module';
import {Subject} from 'rxjs';
import * as firebase from 'firebase';
import {Livre} from '../models/livre.model';
import {Categorie} from "../models/categorie.model";
import {formatDate} from "@angular/common";
@Injectable({
  providedIn: 'root'
})
export class LivreService {
  livres: Livre[] = [];
  livresSubject = new Subject<Livre[]>();

  constructor() { }
  emitLivres() {
    this.livresSubject.next(this.livres);
  }
  saveLivres() {
    firebase.database().ref('/livres').set(this.livres);
  }
  getLivres() {
    firebase.database().ref('/livres')
      .on('value', (data) => {
        this.livres = data.val() ? data.val() : [];
        this.emitLivres();
      });
  }
  getSingleLivre(id: number) {
    return new Promise(
      (resolve, reject) => {
        firebase.database().ref('/livres/' + id).once('value').then(
          (data) => {
            resolve(data.val());
          }, (error) => {
            reject(error);
          }
        );
      }
    );
  }
  createNewLivre(newLivre: Livre) {
    const currentUser = firebase.auth().currentUser;
    newLivre.createBy = currentUser.email;
    this.livres.push(newLivre);
    this.saveLivres();
    this.emitLivres();
  }
  removeLivre(livre: Livre) {
    if (livre.photo) {
      const storageRef = firebase.storage().refFromURL(livre.photo);
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
    if (livre.fichier) {
      const storageRef = firebase.storage().refFromURL(livre.fichier);
      storageRef.delete().then(
        () => {
          console.log('Fichier supprime avec success ');
        }
      ).catch(
        (error) => {
          console.log('Fichier non touvee : ' + error);
        }
      );
    }
    const bookIndexToRemove = this.livres.findIndex(
      (livreDeleted) => {
        if (livreDeleted === livre) {
          return true;
        }
      }
    );
    this.livres.splice(bookIndexToRemove, 1);
    this.saveLivres();
    this.emitLivres();
  }
  uploadFile(file: File) {
    return new Promise(
      (resolve, reject) => {
        const almostUniqueName = Date.now().toString();
        const upload = firebase.storage().ref()
          .child('images/' + almostUniqueName + file.name)
          .put(file);
        upload.on(firebase.storage.TaskEvent.STATE_CHANGED,
          () => {
            console.log('Chargement...');
          },
          (error) => {
            console.log('Erreur de chargement : ' + error);
            reject();
          },
          () => {
            console.log('Chargement Terminee avec success');
            resolve(upload.snapshot.ref.getDownloadURL());
          });
      }
    );
  }

  uploadDoc(file: File) {
    return new Promise(
      (resolve, reject) => {
        const almostUniqueName = Date.now().toString();
        const upload = firebase.storage().ref()
          .child('docs/' + almostUniqueName + file.name)
          .put(file);
        upload.on(firebase.storage.TaskEvent.STATE_CHANGED,
          () => {
            console.log('Chargement...');
          },
          (error) => {
            console.log('Erreur de chargement : ' + error);
            reject();
          },
          () => {
            console.log('Chargement Terminee avec success');
            resolve(upload.snapshot.ref.getDownloadURL());
          });
      }
    );
  }

  updateLivre(liv: Livre, idLivre: number) {
    liv.createBy = firebase.auth().currentUser.email;
    liv.dateUpdate = formatDate(new Date(), 'yyyy/MM/dd hh:mm', 'en');
    this.livres[idLivre] = liv;
    this.saveLivres();
    this.emitLivres();
  }
}
