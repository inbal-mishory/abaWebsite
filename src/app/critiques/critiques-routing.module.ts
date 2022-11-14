import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CritiqueListComponent } from './critique-list.component';

const routes: Routes = [
  {path: '', component: CritiqueListComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CritiquesRoutingModule { }
