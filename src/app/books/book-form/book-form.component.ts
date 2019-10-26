import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {BooksService} from "../../services/books.service";
import {Router} from "@angular/router";
import {BookModule} from "../../models/book.module";
import {UploadService} from "../../services/upload.service";

@Component({
  selector: 'app-book-form',
  templateUrl: './book-form.component.html',
  styleUrls: ['./book-form.component.scss']
})
export class BookFormComponent implements OnInit {

  bookForm: FormGroup;
  fileIsUploading = false;
  fileUrl: string;
  fileUploaded = false;

  docIsUploading = false;
  docUrl: string;
  docUploaded = false;
  constructor(private formBuilder: FormBuilder,
              private booksService: BooksService,
              private uploadService: UploadService,
              private router: Router) { }

  ngOnInit() {
    this.initForm();
  }

  private initForm() {
    this.bookForm = this.formBuilder.group({
      title: ['', Validators.required],
      author: ['', Validators.required],
      description: ['', Validators.required]
    });
  }
  onSaveBook() {
    const title = this.bookForm.get('title').value;
    const author = this.bookForm.get('author').value;
    const description = this.bookForm.get('description').value;
    const newBook = new BookModule(title, author, description);
    if (this.fileUrl && this.fileUrl !== '') {
      newBook.photo = this.fileUrl;
    }
    if (this.docUrl && this.docUrl !== '') {
      newBook.fichier = this.docUrl;
    }
    this.booksService.createNewBook(newBook);
    this.router.navigate(['/books']);
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
  detectFiles(event) {
    this.onUploadFile(event.target.files[0]);
  }

  onUploadDoc(file: File) {
    this.docIsUploading = true;
    this.uploadService.uploadLivre(file, 'Livres/').then(
      (url: string) => {
        this.docUrl = url;
        this.docIsUploading = false;
        this.docUploaded = true;
      }
    );
  }
  detectDocs(event) {
    this.onUploadDoc(event.target.files[0]);
  }

}
