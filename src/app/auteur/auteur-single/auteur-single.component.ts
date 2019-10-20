import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Actor} from "../../models/actor.model";
import {ActorService} from "../../services/actor.service";

@Component({
  selector: 'app-auteur-single',
  templateUrl: './auteur-single.component.html',
  styleUrls: ['./auteur-single.component.scss']
})
export class AuteurSingleComponent implements OnInit {

  actor: Actor;
  constructor(private activatedRoute: ActivatedRoute, private router: Router, private actorService: ActorService) { }

  ngOnInit() {
    const idCat = this.activatedRoute.snapshot.params.id;
    this.actorService.getSingleActor(+idCat).then(
      (act: Actor) => {
        this.actor = act;
      }
    );
  }

  editerActor() {
    this.router.navigate(['/auteurs', 'edit', this.activatedRoute.snapshot.params.id]);
  }

}
