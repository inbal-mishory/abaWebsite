import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {map, takeUntil, tap} from "rxjs/operators";
import {BooksService} from "../../services/books.service";
import {Book, IBook} from "../../models/book.model";
import {Observable, Subject} from "rxjs";

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit {
  books$?: Observable<IBook[]>;
  books?: Book[];
  term!: string;

  constructor(private bookService: BooksService) { }

  ngOnInit(): void {
    this.getBooks();
  }

  getBooks(): void {
    this.books$ = this.bookService.getAllBooks().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ id: c.payload.doc.id, ...c.payload.doc.data() })
        ),
      ),
      tap(data => {
        data.sort((first:any, second:any) => 0 - (first.year < second.year ? -1 : 1));
      }),
      tap(data => this.books = data)
    );
  }

  getIdTrack(index: number, item: Book) {
    return item.id;
  }

}
