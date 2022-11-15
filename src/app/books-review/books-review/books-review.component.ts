import { Component, OnInit } from '@angular/core';
import {Observable, shareReplay, Subject} from "rxjs";
import {BookReviewModel, IBookReviewModel} from "../../models/book-review.model";
import {BookReviewService} from "../../services/book-review.service";
import {map, takeUntil, tap} from "rxjs/operators";
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {MatTableDataSource} from "@angular/material/table";

@Component({
  selector: 'app-books-review',
  templateUrl: './books-review.component.html',
  styleUrls: ['./books-review.component.css']
})
export class BooksReviewComponent implements OnInit {
  term!: string;
  bookReviews$?: Observable<IBookReviewModel[]>;
  bookReviews?: BookReviewModel[];
  destroy$: Subject<boolean> = new Subject<boolean>();
  constructor(private db: AngularFirestore, private bookReviewsService: BookReviewService) { }

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
