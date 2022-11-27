import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ArticlesRoutingModule } from './articles-routing.module';
import { ArticlesComponent } from './articles.component';
import { MaterialModule } from '../shared/material.module';
import { ChildrensArticlesComponent } from './childrens-articles/childrens-articles.component';
import {ScholarlyArticlesComponent} from "./scholarly-articles/scholarly-articles.component";


@NgModule({
  declarations: [
    ArticlesComponent,
    ChildrensArticlesComponent,
    ScholarlyArticlesComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ArticlesRoutingModule
  ]
})
export class ArticlesModule { }
