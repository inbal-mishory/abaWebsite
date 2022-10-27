import { Component, OnInit } from '@angular/core';
import {map, tap} from "rxjs/operators";
import {BooksService} from "../../services/books.service";
import {IBook} from "../../models/book.model";

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit {
  books?:IBook[];
  term!: string;
  constructor(private bookService: BooksService) { }

  ngOnInit(): void {
    this.getBooks();
  }

  getBooks(): void {
    this.bookService.getAllBooks().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ id: c.payload.doc.id, ...c.payload.doc.data() })
        ),
      ),
      tap(data => {
        data.sort((first:any, second:any) => 0 - (first.year < second.year ? -1 : 1));
      })
    ).subscribe((res) => this.books = res);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    // @ts-ignore
    this.dataSource.filter = filterValue.trim().toLowerCase();
    // @ts-ignore
    this.displayNoRecords = this.dataSource.filteredData.length === 0;
  }

}
