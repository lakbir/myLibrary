import { Component, OnInit } from '@angular/core';
import {Actor} from "../../models/actor.model";
import {ActivatedRoute, Router} from "@angular/router";
import {ActorService} from "../../services/actor.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-auteur-edit',
  templateUrl: './auteur-edit.component.html',
  styleUrls: ['./auteur-edit.component.scss']
})
export class AuteurEditComponent implements OnInit {

  actor: Actor;
  actorFormUpdate: FormGroup;
  fileIsUploading = false;
  fileUrl = '';
  fileUploaded = false;
  constructor(private activatedRoute: ActivatedRoute, private router: Router, private actorService: ActorService, private formBuilder: FormBuilder, private userService: AuthService) { }

  ngOnInit() {
    const idCat = this.activatedRoute.snapshot.params.id;
    this.actorService.getSingleActor(+idCat).then(
      (act: Actor) => {
        this.actor = act;
      }
    );
    this.initForm();
  }

  private initForm() {
    this.actorFormUpdate = this.formBuilder.group({
      prenom: ['', Validators.required],
      nom: ['', Validators.required],
      description: ['', Validators.required]
    });
  }

  editerActor() {
    this.router.navigate(['/auteurs', 'edit', this.activatedRoute.snapshot.params.id]);
  }

  onUpdateActor() {
    this.actorService.updateActor(this.actor, this.activatedRoute.snapshot.params.id);
    this.router.navigate(['auteurs']);
  }

  onUploadFile(file: File) {
    this.fileIsUploading = true;
    this.userService.uploadFile(file).then(
      (url: string) => {
        this.actor.photo = url;
        this.fileIsUploading = false;
        this.fileUploaded = true;
      }
    );
  }
  detectFiles(event) {
    this.onUploadFile(event.target.files[0]);
  }
}
