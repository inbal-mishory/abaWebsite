import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BooksRoutingModule } from './books-routing.module';
import {BooksComponent} from "./books.component";
import {MaterialModule} from "../../shared/material.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {FlexLayoutModule} from "@angular/flex-layout";
import {AddEditBookComponent} from "./add-edit-book/add-edit-book.component";


@NgModule({
  declarations: [BooksComponent, AddEditBookComponent],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    BooksRoutingModule
  ]
})
export class BooksModule { }
