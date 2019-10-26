import { Injectable } from '@angular/core';
import {BookModule} from '../models/book.module';
import {Subject} from 'rxjs';
import * as firebase from 'firebase';
@Injectable({
  providedIn: 'root'
})
export class BooksService {
  books: BookModule[] = [];
  booksSubject = new Subject<BookModule[]>();

  constructor() { }
  emitBooks() {
    this.booksSubject.next(this.books);
  }
  saveBooks() {
    firebase.database().ref('/books').set(this.books);
  }
  getBooks() {
    firebase.database().ref('/books')
      .on('value', (data) => {
        this.books = data.val() ? data.val() : [];
        this.emitBooks();
      });
  }
  getSingleBook(id: number) {
    return new Promise(
      (resolve, reject) => {
        firebase.database().ref('/books/' + id).once('value').then(
          (data) => {
            resolve(data.val());
          }, (error) => {
            reject(error);
          }
        );
      }
    );
  }
  createNewBook(newBook: BookModule) {
    this.books.push(newBook);
    this.saveBooks();
    this.emitBooks();
  }
  removeBook(book: BookModule) {
    if (book.photo) {
      const storageRef = firebase.storage().refFromURL(book.photo);
      storageRef.delete().then(
        () => {
          console.log('Photo supprime avec success ');
        }
      ).catch(
        (error) => {
          console.log('Photo non touvee : ' + error);
        }
      );
    }
    const bookIndexToRemove = this.books.findIndex(
      (bookEl) => {
        if (bookEl === book) {
          return true;
        }
      }
    );
    this.books.splice(bookIndexToRemove, 1);
    this.saveBooks();
    this.emitBooks();
  }
}
