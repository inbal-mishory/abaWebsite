import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BooksRoutingModule } from './books-routing.module';
import {MaterialModule} from "../shared/material.module";
import { BooksComponent } from './books/books.component';
import {FormsModule} from '@angular/forms'


@NgModule({
  declarations: [
    BooksComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule,
    BooksRoutingModule
  ]
})
export class BooksModule { }
