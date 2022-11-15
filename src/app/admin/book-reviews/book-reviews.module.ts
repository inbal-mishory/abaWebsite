import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BookReviewsRoutingModule } from './book-reviews-routing.module';
import { BookReviewsComponent } from './book-reviews/book-reviews.component';
import {MaterialModule} from "../../shared/material.module";
import { AddEditReviewComponent } from './add-edit-review/add-edit-review.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    BookReviewsComponent,
    AddEditReviewComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    BookReviewsRoutingModule
  ]
})
export class BookReviewsModule { }
