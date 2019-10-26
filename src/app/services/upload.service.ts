import * as firebase from 'firebase';
import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root'
})

export class UploadService {
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

  uploadLivre(file: File, folder: string) {
    return new Promise(
      (resolve, reject) => {
        const almostUniqueName = Date.now().toString();
        const upload = firebase.storage().ref()
          .child(folder + almostUniqueName + file.name)
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
}
