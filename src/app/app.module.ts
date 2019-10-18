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
import {NotFoundComponent} from "./not-found/not-found.component";
import { SidebarComponent } from './sidebar/sidebar.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ArticleListComponent } from './article/article-list/article-list.component';
import { HistoireListComponent } from './histoire/histoire-list/histoire-list.component';
import { AuteurListComponent } from './auteur/auteur-list/auteur-list.component';
import { UserListComponent } from './user/user-list/user-list.component';
import { MonProfileComponent } from './profile/mon-profile/mon-profile.component';
import {CategorieListComponent} from "./categorie/categorie-list/categorie-list.component";
import { CategorieSingleComponent } from './categorie/categorie-single/categorie-single.component';
import { CategorieEditComponent } from './categorie/categorie-edit/categorie-edit.component';
import { ShowProfileComponent } from './profile/show-profile/show-profile.component';
const appRoutes: Routes = [
  {path: 'auth/signup', component: SignupComponent},
  {path: 'auth/signin', component: SigninComponent},
  {path: 'notfound', component: NotFoundComponent},
  {path: 'books', canActivate: [AuthGuardService], component: BookListComponent},
  {path: 'monprofile', canActivate: [AuthGuardService], component: ShowProfileComponent},
  {path: 'updateprofile', canActivate: [AuthGuardService], component: MonProfileComponent},
  {path: 'histoires', canActivate: [AuthGuardService], component: HistoireListComponent},
  {path: 'users', canActivate: [AuthGuardService], component: UserListComponent},
  {path: 'auteurs', canActivate: [AuthGuardService], component: AuteurListComponent},
  {path: 'articles', canActivate: [AuthGuardService], component: ArticleListComponent},
  {path: 'mylibrary', canActivate: [AuthGuardService], component: DefaultViewComponent},
  {path: 'categories', canActivate: [AuthGuardService], component: CategorieListComponent},
  {path: 'categories/view/:id', canActivate: [AuthGuardService], component: CategorieSingleComponent},
  {path: 'categories/edit/:id', canActivate: [AuthGuardService], component: CategorieEditComponent},
  {path: 'books/new', canActivate: [AuthGuardService], component: BookFormComponent},
  {path: 'books/view/:id', canActivate: [AuthGuardService], component: BookSingleComponent},
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
    ShowProfileComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [
    AuthService,
    AuthGuardService,
    BooksService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
