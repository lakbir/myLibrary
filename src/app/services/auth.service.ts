import { Injectable } from '@angular/core';
import * as firebase from 'firebase';

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
}
