import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {BooksReviewComponent} from "./books-review/books-review.component";

const routes: Routes = [
  {path: '', component: BooksReviewComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BooksReviewRoutingModule { }
