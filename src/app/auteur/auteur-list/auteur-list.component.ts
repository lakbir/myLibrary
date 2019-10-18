import { Component, OnInit } from '@angular/core';
import {Categorie} from "../../models/categorie.model";
import {Actor} from "../../models/actor.model";
import {Subscription} from "rxjs";
import {ActorService} from "../../services/actor.service";

@Component({
  selector: 'app-auteur-list',
  templateUrl: './auteur-list.component.html',
  styleUrls: ['./auteur-list.component.scss']
})
export class AuteurListComponent implements OnInit {
  actors: Actor[];
  actorsSubscription: Subscription;
  constructor(private actorService: ActorService) { }

  ngOnInit() {
    this.actorsSubscription = this.actorService.actorsSubject.subscribe(
      (acts: Actor[]) => {
        this.actors = acts;
      }
    );
    this.actorService.getActors();
    this.actorService.emitActors();
  }

}
