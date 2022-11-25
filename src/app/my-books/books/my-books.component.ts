import { Component,  OnInit } from '@angular/core';
import {map, tap} from "rxjs/operators";
import {MyBooksService} from "../../services/my-books.service";
import {Book, IBook} from "../../models/book.model";
import {Observable} from "rxjs";

@Component({
  selector: 'app-my-books-list',
  templateUrl: './my-books.component.html',
  styleUrls: ['./my-books.component.css']
})
export class MyBooksListComponent implements OnInit {
  books$?: Observable<IBook[]>;
  books?: Book[];
  term!: string;

  constructor(private bookService: MyBooksService) { }

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
