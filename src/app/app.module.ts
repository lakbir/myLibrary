import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { SignupComponent } from './auth/signup/signup.component';
import { SigninComponent } from './auth/signin/signin.component';
import { BookListComponent } from './books/book-list/book-list.component';
import { BookSingleComponent } from './books/book-single/book-single.component';
import { BookFormComponent } from './books/book-form/book-form.component';
import { HeaderComponent } from './header/header.component';
import {AuthService} from './services/auth.service';
import {AuthGuardService} from './services/auth-guard.service';
import {BooksService} from './services/books.service';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {RouterModule, Routes} from '@angular/router';
import { DefaultViewComponent } from './default-view/default-view.component';
import {NotFoundComponent} from './not-found/not-found.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ArticleListComponent } from './article/article-list/article-list.component';
import { HistoireListComponent } from './histoire/histoire-list/histoire-list.component';
import { AuteurListComponent } from './auteur/auteur-list/auteur-list.component';
import { UserListComponent } from './user/user-list/user-list.component';
import { MonProfileComponent } from './profile/mon-profile/mon-profile.component';
import {CategorieListComponent} from './categorie/categorie-list/categorie-list.component';
import { CategorieSingleComponent } from './categorie/categorie-single/categorie-single.component';
import { CategorieEditComponent } from './categorie/categorie-edit/categorie-edit.component';
import { ShowProfileComponent } from './profile/show-profile/show-profile.component';
import { AuteurSingleComponent } from './auteur/auteur-single/auteur-single.component';
import { AuteurEditComponent } from './auteur/auteur-edit/auteur-edit.component';
import { LivreSingleComponent } from './livres/livre-single/livre-single.component';
import { LivreFormComponent } from './livres/livre-form/livre-form.component';
import {LivreListComponent} from './livres/livre-list/livre-list.component';
import {UploadService} from './services/upload.service';
import { LivreEditComponent } from './livres/livre-edit/livre-edit.component';
import { ArticleEditComponent } from './article/article-edit/article-edit.component';
import { ArticleSingleComponent } from './article/article-single/article-single.component';
const appRoutes: Routes = [
  {path: 'auth/signup', component: SignupComponent},
  {path: 'auth/signin', component: SigninComponent},
  {path: 'notfound', component: NotFoundComponent},
  {path: 'monprofile', canActivate: [AuthGuardService], component: ShowProfileComponent},
  {path: 'updateprofile', canActivate: [AuthGuardService], component: MonProfileComponent},
  {path: 'histoires', canActivate: [AuthGuardService], component: HistoireListComponent},
  {path: 'users', canActivate: [AuthGuardService], component: UserListComponent},
  {path: 'auteurs', canActivate: [AuthGuardService], component: AuteurListComponent},
  {path: 'auteurs/view/:id', canActivate: [AuthGuardService], component: AuteurSingleComponent},
  {path: 'auteurs/edit/:id', canActivate: [AuthGuardService], component: AuteurEditComponent},
  {path: 'articles', canActivate: [AuthGuardService], component: ArticleListComponent},
  {path: 'articles/edit/:idArticle', canActivate: [AuthGuardService], component: ArticleEditComponent},
  {path: 'articles/view/:idArticle', canActivate: [AuthGuardService], component: ArticleSingleComponent},
  {path: 'mylibrary', canActivate: [AuthGuardService], component: DefaultViewComponent},
  {path: 'categories', canActivate: [AuthGuardService], component: CategorieListComponent},
  {path: 'categories/view/:id', canActivate: [AuthGuardService], component: CategorieSingleComponent},
  {path: 'categories/edit/:id', canActivate: [AuthGuardService], component: CategorieEditComponent},
  {path: 'livres', canActivate: [AuthGuardService], component: LivreListComponent},
  {path: 'livres/new', canActivate: [AuthGuardService], component: LivreFormComponent},
  {path: 'livres/view/:idLivre', canActivate: [AuthGuardService], component: LivreSingleComponent},
  {path: 'livres/edit/:idLivre', canActivate: [AuthGuardService], component: LivreEditComponent},
  {path: '', redirectTo: 'mylibrary', pathMatch: 'full'},
  {path: '**', redirectTo: 'notfound'}
];
@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    SigninComponent,
    BookListComponent,
    BookSingleComponent,
    BookFormComponent,
    HeaderComponent,
    DefaultViewComponent,
    NotFoundComponent,
    SidebarComponent,
    NavbarComponent,
    ArticleListComponent,
    HistoireListComponent,
    AuteurListComponent,
    UserListComponent,
    MonProfileComponent,
    CategorieListComponent,
    CategorieSingleComponent,
    CategorieEditComponent,
    ShowProfileComponent,
    AuteurSingleComponent,
    AuteurEditComponent,
    LivreSingleComponent,
    LivreFormComponent,
    LivreListComponent,
    LivreEditComponent,
    ArticleEditComponent,
    ArticleSingleComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
    ReactiveFormsModule.withConfig({warnOnNgModelWithFormControl: 'never'})
  ],
  providers: [
    AuthService,
    AuthGuardService,
    BooksService,
    UploadService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
