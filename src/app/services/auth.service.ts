import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import {User} from "../models/user.model";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }
  public createNewUser(email: string, password: string) {
    return new Promise(
      (resolve, reject) => {
        firebase.auth().createUserWithEmailAndPassword(email, password).then(
          () => {
            resolve();
            console.log('User added with success !!!');
          },
          (error) => {
            reject(error);
          }
        );
      }
    );
  }
  public signInUser(email: string, password: string){
    return new Promise(
      (resolve, reject) => {
        firebase.auth().signInWithEmailAndPassword(email, password).then(
          () => {
            resolve();
          },
          (err) => {
            reject(err);
          }
        );
      }
    );
  }
  public signOutUser() {
    firebase.auth().signOut();
  }
  public getCurrentUser() {
    const user = firebase.auth().currentUser;
    if (user != null) {return new User(user.displayName, user.email, firebase.auth().currentUser.photoURL, firebase.auth().currentUser.uid, firebase.auth().currentUser.phoneNumber, '');
  }
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
}
