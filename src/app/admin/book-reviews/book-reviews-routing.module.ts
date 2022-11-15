import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {BookReviewsComponent} from "./book-reviews/book-reviews.component";

const routes: Routes = [
  {path: '', component: BookReviewsComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BookReviewsRoutingModule { }
