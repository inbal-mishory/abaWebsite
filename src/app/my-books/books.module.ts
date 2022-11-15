import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BooksRoutingModule } from './books-routing.module';
import {MaterialModule} from "../shared/material.module";
import { MyBooksComponent } from './books/my-books.component';
import {FormsModule} from '@angular/forms'
import { Ng2SearchPipeModule } from 'ng2-search-filter';


@NgModule({
  declarations: [
    MyBooksComponent
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
