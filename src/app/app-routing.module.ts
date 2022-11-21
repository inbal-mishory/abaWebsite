import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from "./components/home/home.component";
import {SignInComponent} from "./auth/sign-in/sign-in.component";
import {AuthService} from "./services/auth.service";
import {AuthGuard} from "./shared/guard/auth.guard";
import {AboutComponent} from "./components/about/about.component";

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
    data: { title: 'עמוד הבית' }
  },
  { path: 'home',
    component: HomeComponent,
    data: { title: 'עמוד הבית' }
  },
  { path: 'catalogs',
    data: { title: 'קטלוגים' },
    loadChildren: () => import('./catalogs/catalogs.module').then(
      (b) => b.CatalogsModule)
  },
  {
    path: 'admin',
    canActivate: [AuthGuard],
    loadChildren: () => import('./admin/admin.module').then(
      (m) => m.AdminModule)
  },
  {
    path: 'todo-boards',
    canActivate: [AuthGuard],
    loadChildren: () => import('./todo-boards/todo-boards.module').then(
      (b) => b.TodoBoardsModule)
  },
  {
    path: 'my-books',
    data: { title: 'ספרים', description: ' - מאת אליק מישורי' },
    loadChildren: () => import('./my-books/books.module').then(
      (b) => b.BooksModule)
  },
  {
    path: 'video-lecture',
    data: { title: 'הרצאות מוקלטות', description: ' - קטעי מדיה בהשתתפות אליק מישורי' },
    loadChildren: () => import('./video-lecture/video-lecture.module').then(
      (m) => m.VideoLectureModule)
  },
  { path: 'critique',
    data: { title: 'בקורת תערוכות', description: ' - בעיתונים מעריב והארץ' },
    loadChildren: () => import('./critiques/critiques.module').then(
      (m) => m.CritiquesModule)
  },
  { path: 'articles',
    data: { title: 'מאמרים', description: ' - מאת אליק מישורי' },
    loadChildren: () => import('./articles/articles.module').then(
      (b) => b.ArticlesModule)
  },
  { path: 'user', loadChildren: () => import('./user/user.module').then(
    (m) => m.UserModule)
  },
  { path: 'books-review',
    data: { title: 'בקורות', description: ' - על ספרי אליק מישורי' },
    loadChildren: () => import('./books-review/books-review.module').then(
      (m) => m.BooksReviewModule)
  },
  { path: 'about',
    data: { title: 'אודות', description: ' - אליק מישורי' },
    component: AboutComponent },
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
