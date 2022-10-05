import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BooksRoutingModule } from './books-routing.module';
import {MaterialModule} from "../shared/material.module";
import { BooksComponent } from './books/books.component';


@NgModule({
  declarations: [
    BooksComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    BooksRoutingModule
  ]
})
export class BooksModule { }
