import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BooksRoutingModule } from './books-routing.module';
import {MaterialModule} from "../shared/material.module";
import {FormsModule} from '@angular/forms'
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { BookDetailsComponent } from './book-details/book-details.component';
import {MyBooksComponent} from "./my-books.component";
import {MyBooksListComponent} from "./books/my-books.component";


@NgModule({
  declarations: [
    MyBooksComponent,
    MyBooksListComponent,
    BookDetailsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule,
    BooksRoutingModule,
    Ng2SearchPipeModule
  ]
})
export class BooksModule { }
