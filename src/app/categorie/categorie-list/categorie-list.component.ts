import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {CategorieService} from '../../services/categorie.service';
import {Categorie} from '../../models/categorie.model';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-categorie-list',
  templateUrl: './categorie-list.component.html',
  styleUrls: ['./categorie-list.component.scss']
})
export class CategorieListComponent implements OnInit {
  categorieForm: FormGroup;
  showOrHideMessageCategorie = false;
  classMessageCategorie = '';
  @ViewChild('closeModalNewCategorie') private closeModalNewCategorie: ElementRef;
  @ViewChild('closeModalDeleteCategorie') private closeModalDeleteCategorie: ElementRef;
  messageCategorie = '';
  categories: Categorie[];
  categoriesSubscription: Subscription;
  idCategorieDeleted: number;
  constructor(private formBuilder: FormBuilder,
              private categorieService: CategorieService,
              private router: Router) { }

  ngOnInit() {
    this.categoriesSubscription = this.categorieService.categoriesSubject.subscribe(
      (cats: Categorie[]) => {
        this.categories = cats;
      }
    );
    this.categorieService.getCategories();
    this.categorieService.emitCategories();
    this.initForm();
  }

  private initForm() {
    this.categorieForm = this.formBuilder.group({
      categorie: ['', Validators.required],
      description: ['', Validators.required]
    });
  }

  onSaveCategorie() {
    const categorieName = this.categorieForm.get('categorie').value;
    const description = this.categorieForm.get('description').value;
    const cat = new Categorie(categorieName, description);
    this.categorieService.createNewCategorie(cat);
    this.messageCategorie = 'Catégorie créé avec success !!!';
    this.classMessageCategorie = 'alert-success';
    this.showOrHideMessageCategorie = !this.showOrHideMessageCategorie;
    this.closeModalNewCategorie.nativeElement.click();
    this.router.navigate(['/categories']);
  }

  showCategorie(id: number) {
    this.router.navigate(['/categories', 'view', id]);
  }
  editerCategorie(idCat: number) {
    this.router.navigate(['/categories', 'edit', idCat]);
  }
  setIdCategorieDeleted(i: number) {
  this.idCategorieDeleted = i;
  }
  onDeleteCategorie() {
    console.log('Id Categorie deleted : ' + this.idCategorieDeleted);
    this.categorieService.deleteCategorie(this.idCategorieDeleted);
    this.messageCategorie = 'Catégorie supprimée avec success !!!';
    this.classMessageCategorie = 'alert-success';
    this.showOrHideMessageCategorie = !this.showOrHideMessageCategorie;
    this.closeModalDeleteCategorie.nativeElement.click();
    this.router.navigate(['/categories']);
  }


}
