import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MyBooksListComponent} from "./books/my-books.component";
import {BookDetailsComponent} from "./book-details/book-details.component";
import {MyBooksComponent} from "./my-books.component";

const routes: Routes = [
  {
    path: '', component: MyBooksComponent,
    children: [
      {
        path: 'list',
        component: MyBooksListComponent,
        data:{title: 'ספרים'}},
      {
        path: 'book/:id',
        component: BookDetailsComponent,
        data:{title: 'ספר'}
      }
    ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BooksRoutingModule { }
