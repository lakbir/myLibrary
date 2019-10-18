import { Component, OnInit } from '@angular/core';
import {Categorie} from '../../models/categorie.model';
import {ActivatedRoute, Router, RouterLinkActive} from "@angular/router";
import {CategorieService} from "../../services/categorie.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-categorie-edit',
  templateUrl: './categorie-edit.component.html',
  styleUrls: ['./categorie-edit.component.scss']
})
export class CategorieEditComponent implements OnInit {
  categorie: Categorie;
  categorieForm: FormGroup;
  constructor(private router: Router, private routerActivated: ActivatedRoute, private categorieService: CategorieService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    const id = this.routerActivated.snapshot.params.id;
    this.categorieService.getSingleCategorie(+id).then(
      (cat: Categorie) => {
        this.categorie = cat;
      },
      (err) => {
        console.log('Erreur de charger la categorie ' + id);
      }
    );
    this.initForm();
  }
  private initForm() {
    this.categorieForm = this.formBuilder.group({
      categorie: ['', Validators.required],
      description: ['', Validators.required]
    });
  }
  onUpdateCategorie() {
    this.categorieService.updateCategorie(this.categorie, this.routerActivated.snapshot.params.id);
    this.router.navigate(['categories']);
  }

  returnBack() {
    this.router.navigate(['categories']);
  }
}
