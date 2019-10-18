import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {CategorieService} from '../../services/categorie.service';
import {Categorie} from '../../models/categorie.model';

@Component({
  selector: 'app-categorie-single',
  templateUrl: './categorie-single.component.html',
  styleUrls: ['./categorie-single.component.scss']
})
export class CategorieSingleComponent implements OnInit {
  categorie: Categorie;
  constructor(private activatedRoute: ActivatedRoute, private router: Router, private categorieService: CategorieService) { }

  ngOnInit() {
    const idCat = this.activatedRoute.snapshot.params['id'];
    this.categorieService.getSingleCategorie(+idCat).then(
      (cat: Categorie) => {
        this.categorie = cat;
      }
    );
  }

  editerCategorie() {
    this.router.navigate(['/categories', 'edit', this.activatedRoute.snapshot.params['id']]);
  }
}
