import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CatalogsListComponent } from './catalogs/catalogs-list.component';
import {CatalogComponent} from "./catalog/catalog.component";
import {CatalogsComponent} from "./catalogs.component";

const routes: Routes = [
  { path: '',
    component: CatalogsComponent,
    children: [
      { path: 'list', component: CatalogsListComponent},
      { path: ':catalogId', component: CatalogComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CatalogsRoutingModule { }
