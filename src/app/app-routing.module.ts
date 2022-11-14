import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from "./components/home/home.component";
import {SignInComponent} from "./auth/sign-in/sign-in.component";
import {AuthService} from "./services/auth.service";
import {AuthGuard} from "./shared/guard/auth.guard";
import {AboutComponent} from "./components/about/about.component";

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'catalogs', loadChildren: () => import('./catalogs/catalogs.module').then(
                                    (b) => b.CatalogsModule)
  },
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
  { path: 'critique',
    loadChildren: () => import('./critiques/critiques.module').then(m => m.CritiquesModule) },
  { path: 'articles', loadChildren: () => import('./articles/articles.module').then(
    (b) => b.ArticlesModule
  ) },
  { path: 'about', component: AboutComponent },
  { path: 'auth', component: SignInComponent },
  { path: 'catalogs', loadChildren: () => import('./catalogs/catalogs.module').then(m => m.CatalogsModule) },
  { path: 'articles', loadChildren: () => import('./articles/articles.module').then(m => m.ArticlesModule) },
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
