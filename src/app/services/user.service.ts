import { Injectable } from '@angular/core';
import {Categorie} from '../models/categorie.model';
import {Subject} from 'rxjs';
import * as firebase from 'firebase';
import {formatDate} from '@angular/common';
import {User2} from '../models/user2.model';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  users: User2[] = [];
  usersSubject = new Subject<User2[]>();
  constructor() {}

  emitUsers() {
    this.usersSubject.next(this.users);
  }
  saveUsers() {
    firebase.database().ref('/users').set(this.users);
  }
  getUsers() {
    firebase.database().ref('/users')
      .on('value', (data) => {
        this.users = data.val() ? data.val() : [];
        this.emitUsers();
      });
  }
  getUserByEmail() {
    const email = firebase.auth().currentUser.email;
    const user = this.users.find(x => x.email === email);
    return user;
  }
  getSingleUser(id: number) {
    return new Promise(
      (resolve, reject) => {
        firebase.database().ref('/users/' + id).once('value').then(
          (data) => {
            resolve(data.val());
          }, (error) => {
            reject(error);
          }
        );
      }
    );
  }
  createNewUser(newUser: User2) {
    newUser.dateCreated = formatDate(new Date(), 'yyyy/MM/dd hh:mm', 'en');
    this.users.push(newUser);
    this.saveUsers();
    this.emitUsers();
  }
  removeUser(user: User2) {
    const userIndexToRemove = this.users.findIndex(
      (us) => {
        if (us === user) {
          return true;
        }
      }
    );
    this.users.splice(userIndexToRemove, 1);
    this.saveUsers();
    this.emitUsers();
  }
  deleteUser(idUser: number) {
    this.users.splice(idUser, 1);
    this.saveUsers();
    this.emitUsers();
  }
  updateUser(usr: User2, idUser: number) {
    usr.lastUpdate = formatDate(new Date(), 'yyyy/MM/dd hh:mm', 'en');
    this.users[idUser] = usr;
    this.saveUsers();
    this.emitUsers();
  }
}
