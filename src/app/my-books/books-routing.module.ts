import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {MyBooksComponent} from "./books/my-books.component";

const routes: Routes = [
  {path: '', component: MyBooksComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BooksRoutingModule { }
