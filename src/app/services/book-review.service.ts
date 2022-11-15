import { Injectable } from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection} from "@angular/fire/compat/firestore";
import {IBookReviewModel} from "../models/book-review.model";
import {IBook} from "../models/book.model";

@Injectable({
  providedIn: 'root'
})
export class BookReviewService {
  private dbPath = '/books-review';
  booksRef: AngularFirestoreCollection<IBookReviewModel>;

  constructor(private db: AngularFirestore) {
    this.booksRef = db.collection(this.dbPath);
  }

  getAllBookReview(): AngularFirestoreCollection<IBookReviewModel> {
    return this.booksRef;
  }

  createReview(review: IBookReviewModel): any {
    return this.booksRef.add({ ...review });
  }

  update(id: string, data: any): Promise<void> {
    return this.booksRef.doc(id).update(data);
  }

  delete(id: string): Promise<void> {
    return this.booksRef.doc(id).delete();
  }
}
