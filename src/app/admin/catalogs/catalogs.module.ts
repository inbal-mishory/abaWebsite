import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CatalogsRoutingModule } from './catalogs-routing.module';
import {MaterialModule} from "../../shared/material.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {CatalogsComponent} from "./catalogs.component";
import {AddCatalogComponent} from "./add-catalog/add-catalog.component";
import {EditCatalogComponent} from "./edit-catalog/edit-catalog.component";
import {CatalogComponent} from "./catalog/catalog.component";
import {FlexLayoutModule} from "@angular/flex-layout";


@NgModule({
  declarations: [CatalogsComponent, AddCatalogComponent, EditCatalogComponent, CatalogComponent ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    CatalogsRoutingModule
  ]
})
export class CatalogsModule { }
