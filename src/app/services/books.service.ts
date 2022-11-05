import { Injectable } from '@angular/core';
import { AngularFireList} from "@angular/fire/compat/database";
import {AngularFirestore, AngularFirestoreCollection} from "@angular/fire/compat/firestore";
import {IBook} from "../models/book.model";

@Injectable({
  providedIn: 'root'
})
export class BooksService {
  private dbPath = '/Books';
  booksList?: AngularFireList<IBook>;

  booksRef: AngularFirestoreCollection<IBook>;
  constructor(private db: AngularFirestore) {
    this.booksRef = db.collection(this.dbPath);
  }

  getAllBooks(): AngularFirestoreCollection<IBook> {
    return this.booksRef;
  }

  updateBook(id: string | undefined, data: any) {
    return this.booksRef.doc(id).update(data);
  }

  createBook(book: IBook): any {
    return this.booksRef.add({ ...book });
  }

  delete(id: string): Promise<void> {
    return this.booksRef.doc(id).delete();
  }
}
