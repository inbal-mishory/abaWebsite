import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {BookReviewService} from "../../../services/book-review.service";
import {IBookReviewModel} from "../../../models/book-review.model";

@Component({
  selector: 'app-add-edit-review',
  templateUrl: './add-edit-review.component.html',
  styleUrls: ['./add-edit-review.component.css']
})
export class AddEditReviewComponent implements OnInit {
  editReviewForm?: FormGroup;
  isEdit?: boolean;
  constructor(private formBuilder: FormBuilder, @Inject(MAT_DIALOG_DATA) readonly data: any,
              public dialogRef: MatDialogRef<AddEditReviewComponent>, private booksService: BookReviewService) { }

  ngOnInit(): void {
    this.isEdit = this.data.isEdit;
    this.initForm();
  }

  initForm(): void {
    this.editReviewForm = this.formBuilder.group({
      title: [this.isEdit ? this.data.details.title : '', [Validators.required]],
      id: this.isEdit ? this.data.details.id : '',
      link: this.isEdit ? this.data.details.link : '',
      writer: this.isEdit ? this.data.details.writer : '',
      paper: this.isEdit ? this.data.details.paper : '',
    });
  }

  closeModal(): void {
    this.dialogRef.close();
  }

  updateBook() {
    const review = this.editReviewForm.getRawValue();
    this.booksService.update(review.id, {...review}).then();
    this.dialogRef.close();
  }

  createReview(review: IBookReviewModel) {
    this.booksService.createReview(review).then(() => {
      this.dialogRef.close({data: review});
    });
  }
}
