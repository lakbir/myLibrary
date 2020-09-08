import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ArticleModule} from '../../models/article/article.module';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Categorie} from "../../models/categorie.model";
import {CategorieService} from "../../services/categorie.service";
import {Subscription} from "rxjs";
import {UploadService} from "../../services/upload.service";
import {ArticleService} from "../../services/article.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.scss']
})
export class ArticleListComponent implements OnInit {
  articles: ArticleModule[];
  articleForm: FormGroup;
  categories: Categorie[];
  categoriesSubscription: Subscription;
  articlesSubscription: Subscription;
  fileIsUploading = false;
  fileUrl: string;
  fileUploaded = false;
  msgArticle = '';
  showHideMsgArticle = false;
  classMsgArticle = '';
  idArticleToDelete: number;
  @ViewChild('closeModalNewArticle') private closeModalNewArticle: ElementRef;
  @ViewChild('closeModalDeleteArticle') private closeModalDeleteArticle: ElementRef;
  constructor(private formBuilder: FormBuilder,
              private uploadService: UploadService,
              private articleService: ArticleService,
              private router: Router,
              private categorieService: CategorieService) { }

  ngOnInit() {
    this.articlesSubscription = this.articleService.articlesSubject.subscribe(
      (arts: ArticleModule[]) => {
        this.articles = arts;
      }
    );
    this.articleService.getArticles();
    this.articleService.emitArticles();
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

  onSaveArticle() {
    const categorie = this.articleForm.get('categorie').value;
    const article = this.articleForm.get('article').value;
    const title = this.articleForm.get('title').value;
    const art = new ArticleModule(this.articles.length, title, article, null, null, null, categorie, this.fileUrl);
    this.articleService.createNewArticle(art);
    this.closeModalNewArticle.nativeElement.click();
    this.msgArticle = 'article a été ajouté avec succès';
    this.showHideMsgArticle = true;
    this.classMsgArticle = 'alert-success';
    this.router.navigate(['/articles']);
  }

  detectFiles(event) {
    this.onUploadFile(event.target.files[0]);
  }

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

  viewArticle(idArticle: number) {
  this.router.navigate(['/articles', 'view', idArticle]);
  }

  editerArticle(idArticle: number) {
    this.router.navigate(['/articles', 'edit', idArticle]);
  }

  setIdArticleDeleted(i: number) {
    this.idArticleToDelete = i;
  }

  onDeleteArticle() {
    this.articleService.deleteArticle(this.idArticleToDelete);
    this.closeModalDeleteArticle.nativeElement.click();
    this.msgArticle = 'article a été supprimée avec succès';
    this.showHideMsgArticle = true;
    this.classMsgArticle = 'alert-success';
    this.router.navigate(['/articles']);
  }
}
