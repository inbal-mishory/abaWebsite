import {Component, EventEmitter, Inject, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {BooksService} from "../../../services/books.service";
import {IBook} from "../../../models/book.model";

@Component({
  selector: 'app-add-edit-book',
  templateUrl: './add-edit-book.component.html',
  styleUrls: ['./add-edit-book.component.css']
})
export class AddEditBookComponent implements OnInit {
  editBookForm?: FormGroup;
  isEdit?: boolean;
  @Output() refreshList: EventEmitter<any> = new EventEmitter();
  message = '';
  constructor(private formBuilder: FormBuilder, @Inject(MAT_DIALOG_DATA) readonly data: any,
              public dialogRef: MatDialogRef<AddEditBookComponent>, private booksService: BooksService) { }

  ngOnInit(): void {
    this.isEdit = this.data.isEdit;
    this.initForm();
  }

  initForm() {
    if (this.data) {
      this.editBookForm = this.formBuilder.group({
        title: [this.data.details.title ? this.data.details.title : '', [Validators.required]],
        id: this.data.details.id ? this.data.details.id : '',
        cover: [this.data.details.cover ? this.data.details.cover : '', [Validators.required]],
        publisher: [this.data.details.publisher ? this.data.details.publisher : '', [Validators.required]],
        publication_year: [this.data.details.publication_year ? this.data.details.publication_year : ''],
        article: this.data.details.article ? this.data.details.article : '',
        link: this.data.details.link ? this.data.details.link : '',
      });
    }
  }

  updateBook() {
    const book = this.editBookForm?.getRawValue();
    this.booksService.updateBook(book.id, book).then()
      .catch(err => console.log(err));
    this.closeModal();
  }

  createBook(book: IBook): void {
    this.booksService.createBook(book).then(() => {
      this.dialogRef.close({data: book});
    });
  }

  deleteCatalog(bookId: string): void {
    this.booksService.delete(bookId)
      .then(() => {
        this.refreshList.emit();
        this.message = 'The book was updated successfully!';
      })
      .catch(err => console.log(err));
  }

  closeModal(): void {
    this.dialogRef.close();
  }
}
