import { NgModule } from '@angular/core';
import {DashboardComponent} from "./dashboard/dashboard.component";
import {AuthChildrenGuard} from "../shared/guard/auth-children.guard";
import {RouterModule, Routes} from "@angular/router";

const routes: Routes = [
  {
    path: '',
    canActivateChild: [AuthChildrenGuard],
    component: DashboardComponent,
    data: { title: 'ניהול המערכת'},
  },
  {
    path: 'articles',
    component: DashboardComponent,
    data: { title: 'מאמרים'},
    loadChildren: () => import('./articles/articles.module').then(
      (m) => m.ArticlesModule)
  },
  {
    path: 'my-books',
    component: DashboardComponent,
    data: { title: 'ספרים'},
    loadChildren: () => import('./books/books.module').then(
      (m) => m.BooksModule)
  },
  {
    path: 'books-review',
    data: { title: 'בקורות'},
    component: DashboardComponent,
    loadChildren: () => import('./book-reviews/book-reviews.module').then(
      (m) => m.BookReviewsModule)
  },
  {
    path: 'catalogs',
    data: { title: 'קטלוגים'},
    component: DashboardComponent,
    loadChildren: () => import('./catalogs/catalogs.module').then(
      (m) => m.CatalogsModule)
  },
  {
    path: 'critiques',
    data: { title: 'בקורת תערוכות'},
    component: DashboardComponent,
    loadChildren: () => import('./critiques/critiques.module').then(
      (m) => m.CritiquesModule)
  },
  {
    path: 'video-lectures',
    data: { title: 'מדיה דיגיטלית'},
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
