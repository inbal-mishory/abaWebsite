import { NgModule } from '@angular/core';
import {DashboardComponent} from "./dashboard/dashboard.component";
import {CatalogsComponent} from "./catalogs/catalogs.component";
import {AddCatalogComponent} from "./add-catalog/add-catalog.component";
import {EditCatalogComponent} from "./edit-catalog/edit-catalog.component";
import {AuthChildrenGuard} from "../shared/guard/auth-children.guard";
import {RouterModule, Routes} from "@angular/router";

const routes: Routes = [
  {
    path: '',
    canActivateChild: [AuthChildrenGuard],
    component: DashboardComponent,
  },
  {
    path: 'dashboard',
    component: DashboardComponent
  },
  {
    path: 'catalogs',
    component: CatalogsComponent
  },
  {
    path: 'add-catalog',
    component: AddCatalogComponent
  },
  {
    path: 'edit-catalog',
    component: EditCatalogComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
