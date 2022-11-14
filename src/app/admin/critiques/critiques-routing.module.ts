import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {CritiquesComponent} from "./critiques.component";

const routes: Routes = [
  { path: '', component: CritiquesComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CritiquesRoutingModule { }
