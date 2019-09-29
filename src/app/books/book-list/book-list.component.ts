import {Component, OnDestroy, OnInit} from '@angular/core';
import {BookModule} from "../../models/book.module";
import {Subscription} from "rxjs";
import {BooksService} from "../../services/books.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss']
})
export class BookListComponent implements OnInit {

  books: BookModule[];
  booksSubscription: Subscription;
  constructor(private booksService: BooksService, private router: Router) { }

  ngOnInit() {
    this.booksSubscription = this.booksService.booksSubject.subscribe(
      (books: BookModule[]) => {
        this.books = books;
      }
    );
    this.booksService.getBooks();
    this.booksService.emitBooks();
  }
  onNewBook() {
    this.router.navigate(['/books', 'new']);
  }
  onDeleteBook(book: BookModule) {
    this.booksService.removeBook(book);
  }
  onViewBook(id: number) {
    this.router.navigate(['/books', 'view', id]);
  }
  ngOnDestroy() {
    this.booksSubscription.unsubscribe();
  }
}
