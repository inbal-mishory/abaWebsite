import { Component, OnInit } from '@angular/core';
import {BookReviewModel} from "../../../models/book-review.model";
import {BookReviewService} from "../../../services/book-review.service";
import {map} from "rxjs/operators";
import {shareReplay} from "rxjs";
import {MatDialog} from "@angular/material/dialog";
import {AddEditReviewComponent} from "../add-edit-review/add-edit-review.component";
import {ConfirmModalComponent} from "../../../shared/modals/confirm.modal/confirm.modal.component";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-book-reviews',
  templateUrl: './book-reviews.component.html',
  styleUrls: ['./book-reviews.component.css']
})
export class BookReviewsComponent implements OnInit {
  bookReviews?: BookReviewModel[];
  constructor(private bookReviewsService: BookReviewService, private dialog: MatDialog, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.bookReviewsService.getAllBookReview().snapshotChanges().pipe(
      map(changes =>
        changes.map(review =>
          ({ ...review.payload.doc.data(), id: review.payload.doc.id })
        ),
      ),
      shareReplay(1)
    ).subscribe(res => this.bookReviews = res);
  }

  deleteDialog(id, title: string) {
    const data = {
      id: id,
      title
    }
    const dialogRef = this.dialog.open(ConfirmModalComponent, {
      width: '25vw',
      height: '25vh',
      data
    } );

    dialogRef.afterClosed().subscribe((res) => {
      if (res) {
        this.deleteReview(id);
      } else {
        console.log('something went wrong')
      }
    });
  }

  openEditReview(review: any) {
    const dialogRef = this.dialog.open(AddEditReviewComponent, {
      width: '35vw',
      height: '50vh',
      data: {
        details: review,
        isEdit: true
      }
    });
    dialogRef.afterClosed().subscribe(() => {
      this.dialog.closeAll();
    })
  }

  openCreateReview() {
    const dialogRef = this.dialog.open(AddEditReviewComponent, {
      width: '35vw',
      height: '50vh',
      data: {
        details: '',
        isEdit: false
      }
    });
    dialogRef.afterClosed().subscribe(() => {
      this.dialog.closeAll();
    })
  }

  deleteReview(reviewId: string) {
    this.bookReviewsService.delete(reviewId).then((res) => {
      this.openSnackBar();
    }).catch((err) => {
      console.log(err);
    });
  }

  openSnackBar(): void {
    this._snackBar.open('Review deleted successfully', 'close', {
      horizontalPosition: "center",
      verticalPosition: "top",
    });
  }
}
