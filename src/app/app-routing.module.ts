import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import { CatalogsListComponent } from './components/catalogs-list/catalogs-list.component';
import {HomeComponent} from "./components/home/home.component";
import {SignInComponent} from "./auth/sign-in/sign-in.component";
import {AuthService} from "./services/auth.service";
import {AuthGuard} from "./shared/guard/auth.guard";
import {CritiqueListComponent} from "./components/critique/critique-list.component";

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
    path: 'critique',
    component: CritiqueListComponent
  },
  {
    path: 'auth',
    component: SignInComponent
  }
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
