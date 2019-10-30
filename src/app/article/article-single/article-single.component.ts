import { Component, OnInit } from '@angular/core';
import {ArticleModule} from "../../models/article/article.module";
import {ActivatedRoute, Router} from "@angular/router";
import {ArticleService} from "../../services/article.service";

@Component({
  selector: 'app-article-single',
  templateUrl: './article-single.component.html',
  styleUrls: ['./article-single.component.scss']
})
export class ArticleSingleComponent implements OnInit {
  currentArticle: ArticleModule;
  constructor(private activatedRoute: ActivatedRoute,
              private router: Router,
              private articleService: ArticleService) { }

  ngOnInit() {
    const idArticle = this.activatedRoute.snapshot.params.idArticle;
    this.articleService.getSingleArticle(idArticle).then(
      (art: ArticleModule) => {
        this.currentArticle = art;
      }
    );
  }

  editerArticle() {
    const idArticle = this.activatedRoute.snapshot.params.idArticle;
    this.router.navigate(['/articles', 'edit', idArticle]);
  }
}
