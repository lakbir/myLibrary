import { Component, OnInit } from '@angular/core';
import {Livre} from "../../models/livre.model";
import {ActivatedRoute, Router} from "@angular/router";
import {LivreService} from "../../services/livre.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CategorieService} from "../../services/categorie.service";
import {Actor} from "../../models/actor.model";
import {Categorie} from "../../models/categorie.model";
import {ActorService} from "../../services/actor.service";
import {Subscription} from "rxjs";
import {UploadService} from "../../services/upload.service";

@Component({
  selector: 'app-livre-edit',
  templateUrl: './livre-edit.component.html',
  styleUrls: ['./livre-edit.component.scss']
})
export class LivreEditComponent implements OnInit {
  isExisteLivre = false;
  currentLivre: Livre;
  reactiveForm: FormGroup;
  fileIsUploading = false;
  fileUrl: string;
  fileUploaded = false;

  docIsUploading = false;
  docUrl: string;
  docUploaded = false;

  actorsSubscription; categoriesSubscription: Subscription;
  actors: Actor[];
  categories: Categorie[];
  constructor(private fb: FormBuilder,
              private uploadService: UploadService,
              private actorService: ActorService,
              private livreService: LivreService,
              private activatedRouter: ActivatedRoute,
              private router: Router,
              private categorieService: CategorieService) { }

  ngOnInit() {
    const idLivre = this.activatedRouter.snapshot.params.idLivre;
    this.livreService.getSingleLivre(+idLivre).then(
      (liv: Livre) => {
        this.currentLivre = liv;
        this.fileUrl = liv.photo;
        this.docUrl = liv.fichier;
        this.isExisteLivre = true;
        console.log('Recuperation SUCCESS');
      }, (err) => {
        console.log('Erreur de recuperer livre : ' + err);
      }
    );
    this.actorsSubscription = this.actorService.actorsSubject.subscribe(
      (acts: Actor[]) => {
        this.actors = acts;
      }
    );
    this.actorService.getActors();
    this.actorService.emitActors();
    this.categoriesSubscription = this.categorieService.categoriesSubject.subscribe(
      (cats: Categorie[]) => {
        this.categories = cats;
      }
    );
    this.categorieService.getCategories();
    this.categorieService.emitCategories();
    console.log(this.actors);
    this.createForm();
  }

  createForm() {
    this.reactiveForm = this.fb.group({
      titleLivre: ['', Validators.required],
      categorieLivre: ['', Validators.required],
      auteurLivre: ['', Validators.required],
      descriptionLivre: ['', [Validators.required, Validators.minLength(50)]]
    });
  }

  onUpdateLivre() {
    this.currentLivre.fichier = this.docUrl;
    this.currentLivre.photo = this.fileUrl;
    this.livreService.updateLivre(this.currentLivre, this.activatedRouter.snapshot.params.idLivre);
    this.router.navigate(['/livres']);
  }
  get titleLivre() { return this.reactiveForm.get('titleLivre'); }
  get categorieLivre() { return this.reactiveForm.get('categorieLivre'); }
  get auteurLivre() { return this.reactiveForm.get('auteurLivre'); }
  get descriptionLivre() { return this.reactiveForm.get('descriptionLivre'); }

  onUploadFile(file: File) {
    this.fileIsUploading = true;
    this.uploadService.uploadFile(file).then(
      (url: string) => {
        this.fileUrl = url;
        this.fileIsUploading = false;
        this.fileUploaded = true;
      }
    );
  }
  detectFiles(event) {
    this.onUploadFile(event.target.files[0]);
  }

  onUploadDoc(file: File) {
    this.docIsUploading = true;
    this.uploadService.uploadLivre(file, 'Livres/').then(
      (url: string) => {
        this.docUrl = url;
        this.docIsUploading = false;
        this.docUploaded = true;
      }
    );
  }
  detectDocs(event) {
    this.onUploadDoc(event.target.files[0]);
  }

  changeCategorie() {
    const idCat = this.reactiveForm.get('categorieLivre').value;
    console.log('Categorie changed ' + idCat);
    this.categorieService.getSingleCategorie(idCat).then(
      (cat: Categorie) => {
        this.currentLivre.categorie = cat;
      }
    );
  }

  changeActor() {
    const idAct = this.reactiveForm.get('auteurLivre').value;
    console.log('Actor changed ' + idAct);
    this.actorService.getSingleActor(idAct).then(
      (act: Actor) => {
        this.currentLivre.actor = act;
      }
    );
  }
}
