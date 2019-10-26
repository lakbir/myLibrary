import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {UploadService} from "../../services/upload.service";
import {Actor} from "../../models/actor.model";
import {Subscription} from "rxjs";
import {ActorService} from "../../services/actor.service";
import {CategorieService} from "../../services/categorie.service";
import {Categorie} from "../../models/categorie.model";
import {Livre} from "../../models/livre.model";
import {formatDate} from "@angular/common";
import {LivreService} from "../../services/livre.service";
import {Router} from "@angular/router";


@Component({
  selector: 'app-livre-form',
  templateUrl: './livre-form.component.html',
  styleUrls: ['./livre-form.component.scss']
})
export class LivreFormComponent implements OnInit {
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
              private router: Router,
              private categorieService: CategorieService) { }

  ngOnInit() {
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
      fichierLivre: ['', Validators.required],
      photoLivre: ['', Validators.required],
      descriptionLivre: ['', [Validators.required, Validators.minLength(50)]]
    });
  }

  onSubmitLivre() {
    const auteurLivre = this.reactiveForm.get('auteurLivre').value;
    const titleLivre = this.reactiveForm.get('titleLivre').value;
    const descriptionLivre = this.reactiveForm.get('descriptionLivre').value;
    const livre = new Livre(titleLivre, descriptionLivre, formatDate(new Date(), 'yyyy/MM/dd hh:mm', 'en'),
      formatDate(new Date(), 'yyyy/MM/dd hh:mm', 'en'), null, null, null, this.docUrl, this.fileUrl);
    const idCat = this.reactiveForm.get('categorieLivre').value;
    const idAct = this.reactiveForm.get('auteurLivre').value;

    this.categorieService.getSingleCategorie(+idCat).then(
      (cat: Categorie) => {
        this.actorService.getSingleActor(+idAct).then(
          (act: Actor) => {
            livre.categorie = cat;
            livre.actor = act;
            console.log('TTTT : ' + livre.title);
            console.log('Livre : ' + livre.title);
            this.livreService.createNewLivre(livre);
          }
        );
      }
    );

    this.router.navigate(['/livres']);
  }
  get titleLivre() { return this.reactiveForm.get('titleLivre'); }
  get categorieLivre() { return this.reactiveForm.get('categorieLivre'); }
  get auteurLivre() { return this.reactiveForm.get('auteurLivre'); }
  get descriptionLivre() { return this.reactiveForm.get('descriptionLivre'); }
  get fichierLivre() { return this.reactiveForm.get('fichierLivre'); }
  get photoLivre() { return this.reactiveForm.get('photoLivre'); }

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
}
