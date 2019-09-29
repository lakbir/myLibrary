import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {BooksService} from "../../services/books.service";
import {BookModule} from "../../models/book.module";

@Component({
  selector: 'app-book-single',
  templateUrl: './book-single.component.html',
  styleUrls: ['./book-single.component.scss']
})
export class BookSingleComponent implements OnInit {

  book: BookModule;
  constructor(private routeActive: ActivatedRoute,
              private booksService: BooksService,
              private router: Router) { }

  ngOnInit() {
    this.book = new BookModule('', '', '');
    const id = this.routeActive.snapshot.params[ 'id' ];
    this.booksService.getSingleBook(+id).then(
      (book: BookModule) => {
        this.book = book;
      }
    );
  }
  onBack() {
    this.router.navigate(['/books']);
  }

}
