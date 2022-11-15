import { Component, OnInit } from '@angular/core';
import { shareReplay} from "rxjs";
import {BookReviewModel} from "../../models/book-review.model";
import {BookReviewService} from "../../services/book-review.service";
import {map} from "rxjs/operators";

@Component({
  selector: 'app-books-review',
  templateUrl: './books-review.component.html',
  styleUrls: ['./books-review.component.css']
})
export class BooksReviewComponent implements OnInit {
  term!: string;
  bookReviews?: BookReviewModel[];
  constructor(private bookReviewsService: BookReviewService) { }

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

}
