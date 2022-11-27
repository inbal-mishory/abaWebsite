import {Component, EventEmitter, Inject, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {MyBooksService} from "../../../services/my-books.service";
import {IBook} from "../../../models/book.model";

@Component({
  selector: 'app-add-edit-book',
  templateUrl: './add-edit-book.component.html',
  styleUrls: ['./add-edit-book.component.css']
})
export class AddEditBookComponent implements OnInit {
  editBookForm?: FormGroup;
  isEdit?: boolean;
  // @Output() refreshList: EventEmitter<any> = new EventEmitter();
  message = '';
  constructor(private formBuilder: FormBuilder, @Inject(MAT_DIALOG_DATA) readonly data: any,
              public dialogRef: MatDialogRef<AddEditBookComponent>, private booksService: MyBooksService) { }

  ngOnInit(): void {
    this.isEdit = this.data.isEdit;
    this.initForm();
  }

  initForm() {
    this.editBookForm = this.formBuilder.group({
      title: [this.isEdit ? this.data.details.title : '', [Validators.required]],
      id: this.isEdit ? this.data.details.id : '',
      cover: [this.isEdit ? this.data.details.cover : '', [Validators.required]],
      publisher: [this.isEdit ? this.data.details.publisher : '', [Validators.required]],
      publication_year: [this.isEdit ? this.data.details.publication_year : ''],
      article: this.isEdit ? this.data.details.article : '',
      article2: this.isEdit ? this.data.details.article2 : '',
      link: this.isEdit ? this.data.details.link : '',
    });
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

  closeModal(): void {
    this.dialogRef.close();
  }
}
