import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ArticlesRoutingModule } from './articles-routing.module';
import { ArticlesComponent } from './articles.component';
import { MaterialModule } from '../shared/material.module';


@NgModule({
  declarations: [
    ArticlesComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ArticlesRoutingModule
  ]
})
export class ArticlesModule { }
