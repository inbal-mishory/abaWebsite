import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BooksReviewRoutingModule } from './books-review-routing.module';
import { BooksReviewComponent } from './books-review/books-review.component';
import {MaterialModule} from "../shared/material.module";


@NgModule({
  declarations: [
    BooksReviewComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    BooksReviewRoutingModule
  ]
})
export class BooksReviewModule { }
