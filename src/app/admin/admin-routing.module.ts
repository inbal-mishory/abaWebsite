import { NgModule } from '@angular/core';
import {DashboardComponent} from "./dashboard/dashboard.component";
import {AuthChildrenGuard} from "../shared/guard/auth-children.guard";
import {RouterModule, Routes} from "@angular/router";
import { VideoLecturesComponent } from './video-lectures/video-lectures.component';

const routes: Routes = [
  {
    path: '',
    canActivateChild: [AuthChildrenGuard],
    component: DashboardComponent,
  },
  {
    path: 'articles',
    component: DashboardComponent,
    loadChildren: () => import('./articles/articles.module').then(
      (m) => m.ArticlesModule)
  },
  {
    path: 'books',
    component: DashboardComponent,
    loadChildren: () => import('./books/books.module').then(
      (m) => m.BooksModule)
  },
  {
    path: 'catalogs',
    component: DashboardComponent,
    loadChildren: () => import('./catalogs/catalogs.module').then(
      (m) => m.CatalogsModule)
  },
  {
    path: 'critiques',
    component: DashboardComponent,
    loadChildren: () => import('./critiques/critiques.module').then(
      (m) => m.CritiquesModule)
  },
  {
    path: 'video-lectures',
    component: DashboardComponent,
    loadChildren: () => import('./video-lectures/video-lectures.module').then(
      (m) => m.VideoLecturesModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
