import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ArticlesRoutingModule } from './articles-routing.module';
import {ArticlesComponent} from "./articles.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MaterialModule} from "../../shared/material.module";
import {AddEditArticleComponent} from "./articles-list/add-edit-article/add-edit-article.component";
import {FlexLayoutModule} from "@angular/flex-layout";
import { ArticlesListComponent } from './articles-list/articles-list.component';
import { ArticlesForChildrenComponent } from './articles-for-children/articles-for-children.component';
import { AddEditChildArticleComponent } from './articles-for-children/add-edit-child-article/add-edit-child-article.component';


@NgModule({
  declarations: [ArticlesComponent, AddEditArticleComponent, ArticlesListComponent, ArticlesForChildrenComponent, AddEditChildArticleComponent],
  imports: [
    CommonModule,
    ArticlesRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    MaterialModule
  ]
})
export class ArticlesModule { }
