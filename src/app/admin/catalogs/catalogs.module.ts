import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CatalogsRoutingModule } from './catalogs-routing.module';
import {MaterialModule} from "../../shared/material.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {CatalogsComponent} from "./catalogs.component";
import {CatalogComponent} from "./catalog/catalog.component";
import {FlexLayoutModule} from "@angular/flex-layout";
import { AddEditCatalogComponent } from './add-edit-catalog/add-edit-catalog.component';


@NgModule({
  declarations: [CatalogsComponent, CatalogComponent, AddEditCatalogComponent ],
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
