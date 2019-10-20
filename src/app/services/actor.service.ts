import { Injectable } from '@angular/core';
import {Subject} from 'rxjs';
import * as firebase from 'firebase';
import {Actor} from '../models/actor.model';

@Injectable({
  providedIn: 'root'
})
export class ActorService {
  actors: Actor[] = [];
  actorsSubject = new Subject<Actor[]>();
  constructor() {}

  emitActors() {
    this.actorsSubject.next(this.actors);
  }
  saveActors() {
    firebase.database().ref('/actors').set(this.actors);
  }
  getActors() {
    firebase.database().ref('/actors')
      .on('value', (data) => {
        this.actors = data.val() ? data.val() : [];
        this.emitActors();
      });
  }
  getSingleActor(id: number) {
    return new Promise(
      (resolve, reject) => {
        firebase.database().ref('/actors/' + id).once('value').then(
          (data) => {
            resolve(data.val());
          }, (error) => {
            reject(error);
          }
        );
      }
    );
  }
  createNewActor(newActor: Actor) {
    this.actors.push(newActor);
    this.saveActors();
    this.emitActors();
  }
  removeActor(act: Actor) {
    const actorIndexToRemove = this.actors.findIndex(
      (actEl) => {
        if (actEl === act) {
          return true;
        }
      }
    );
    this.actors.splice(actorIndexToRemove, 1);
    this.saveActors();
    this.emitActors();
  }
  deleteActor(idAct: number) {
    const actor = this.actors[idAct];
    if (actor.photo) {
      const storageRef = firebase.storage().refFromURL(actor.photo);
      storageRef.delete().then(
        () => {
          console.log('Photo supprime avec success ');
        }
      ).catch(
        (error) => {
          console.log('Photo non touve : ' + error);
        }
      );
    }
    this.actors.splice(idAct, 1);
    this.saveActors();
    this.emitActors();
  }
  updateActor(act: Actor, idAct: number) {
    this.actors[idAct] = act;
    this.saveActors();
    this.emitActors();
  }
}
