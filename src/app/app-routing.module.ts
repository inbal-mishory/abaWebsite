import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import { CatalogsListComponent } from './components/catalogs-list/catalogs-list.component';
import {HomeComponent} from "./components/home/home.component";
import {SignInComponent} from "./auth/sign-in/sign-in.component";
import {AuthService} from "./services/auth.service";
import {AuthGuard} from "./shared/guard/auth.guard";
import {CritiqueListComponent} from "./components/critique/critique-list.component";
import { ArticlesComponent } from './components/articles/articles.component';
import {AboutComponent} from "./components/about/about.component";

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'catalogs', component: CatalogsListComponent },
  { path: 'home', component: HomeComponent },
  {
    path: 'admin',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./admin/admin.module').then(
        (m) => m.AdminModule
      )
  },
  {
    path: 'books',
    loadChildren: () => import('./books/books.module').then(
      (b) => b.BooksModule
    )
  },
  {
    path: 'todo-boards',
    canActivate: [AuthGuard],
    loadChildren: () => import('./todo-boards/todo-boards.module').then(
      (b) => b.TodoBoardsModule
    )
  },
  {
    path: 'video-lecture',
    loadChildren: () => import('./video-lecture/video-lecture.module').then(m => m.VideoLectureModule)
  },
  { path: 'user', loadChildren: () => import('./user/user.module').then(m => m.UserModule) },
  { path: 'critique', component: CritiqueListComponent },
  { path: 'articles', component: ArticlesComponent },
  { path: 'about', component: AboutComponent },
  { path: 'auth', component: SignInComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [
    AuthService,
    AuthGuard]
})
export class AppRoutingModule {
}
