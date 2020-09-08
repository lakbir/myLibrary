import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ArticleService} from "../../services/article.service";
import {ArticleModule} from "../../models/article/article.module";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Subscription} from "rxjs";
import {Categorie} from "../../models/categorie.model";
import {CategorieService} from "../../services/categorie.service";
import {UploadService} from "../../services/upload.service";

@Component({
  selector: 'app-article-edit',
  templateUrl: './article-edit.component.html',
  styleUrls: ['./article-edit.component.scss']
})
export class ArticleEditComponent implements OnInit {
  currentArticle: ArticleModule;
  articleForm: FormGroup;
  categoriesSubscription: Subscription;
  categories: Categorie[];
  photoIsUploading = false;
  photoUrl: string;
  fileUploaded = false;
  constructor(private activatedRoute: ActivatedRoute,
              private formBuilder: FormBuilder,
              private uploadService: UploadService,
              private categorieService: CategorieService,
              private router: Router,
              private articleService: ArticleService) { }

  ngOnInit() {
    const idArticle = this.activatedRoute.snapshot.params.idArticle;
    this.articleService.getSingleArticle(idArticle).then(
      (art: ArticleModule) => {
        this.currentArticle = art;
        this.photoUrl = art.photo;
      }
    );
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
    this.articleForm = this.formBuilder.group({
      categorie: ['', Validators.required],
      title: ['', Validators.required],
      article: ['', [Validators.required, Validators.minLength(50)]],
      photo: [''],
    });
  }
  get categorie() { return this.articleForm.get('categorie'); }
  get title() { return this.articleForm.get('title'); }
  get article() { return this.articleForm.get('article'); }
  get photo() { return this.articleForm.get('photo'); }

  onUpdateArticle() {
      this.currentArticle.photo = this.photoUrl;
      this.articleService.updateArticle(this.currentArticle, this.activatedRoute.snapshot.params.idArticle);
      this.router.navigate(['/articles']);
  }

  detectFiles(event) {
    this.onUploadFile(event.target.files[0]);
  }

  onUploadFile(file: File) {
    this.photoIsUploading = true;
    this.uploadService.uploadFile(file).then(
      (url: string) => {
        this.photoUrl = url;
        this.photoIsUploading = false;
        this.fileUploaded = true;
      }
    );
  }
}
