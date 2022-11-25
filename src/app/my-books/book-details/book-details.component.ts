import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {MyBooksService} from "../../services/my-books.service";

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.css']
})
export class BookDetailsComponent implements OnInit {
  bookId: string;
  bookDetails: any;
  constructor(private route: ActivatedRoute, private bookService: MyBooksService) { }

  ngOnInit(): void {
    this.bookId = this.route.snapshot.paramMap.get('id');
    this.bookService.getBookById(this.bookId).snapshotChanges().subscribe((res) => {
      this.bookDetails = res.payload.data();
    })
  }

}
