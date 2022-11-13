import { NgModule } from '@angular/core';
import {DashboardComponent} from "./dashboard/dashboard.component";
import {CatalogsComponent} from "./catalogs/catalogs.component";
import {AuthChildrenGuard} from "../shared/guard/auth-children.guard";
import {RouterModule, Routes} from "@angular/router";
import {CritiquesComponent} from "./critiques/critiques.component";
import {BooksComponent} from "./books/books.component";
import {StorageComponent} from "./storage/storage.component";
import { ArticlesComponent } from './articles/articles.component';
import { VideoLecturesComponent } from './video-lectures/video-lectures.component';

const routes: Routes = [
  {
    path: '',
    canActivateChild: [AuthChildrenGuard],
    component: DashboardComponent,
    children: [
      {
        path: 'catalogs',
        component: CatalogsComponent
      },
      {
        path: 'critiques',
        component: CritiquesComponent
      },
      {
        path: 'articles',
        component: ArticlesComponent
      },
      {
        path: 'books',
        component: BooksComponent
      },
      {
        path: 'video-lectures',
        component: VideoLecturesComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
