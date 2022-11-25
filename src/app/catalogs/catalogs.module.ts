import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CatalogsRoutingModule } from './catalogs-routing.module';
import { CatalogsListComponent } from './catalogs/catalogs-list.component';
import { MaterialModule } from '../shared/material.module';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { FormsModule } from '@angular/forms';
import { CatalogComponent } from './catalog/catalog.component';
import { CatalogsComponent } from './catalogs.component';


@NgModule({
  declarations: [
    CatalogsListComponent,
    CatalogComponent,
    CatalogsComponent
  ],
  imports: [
    CommonModule,
    CatalogsRoutingModule,
    MaterialModule,
    Ng2SearchPipeModule,
    FormsModule
  ]
})
export class CatalogsModule { }
