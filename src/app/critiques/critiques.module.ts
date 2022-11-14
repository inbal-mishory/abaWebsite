import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CritiquesRoutingModule } from './critiques-routing.module';
import { MaterialModule } from '../shared/material.module';
import { CritiqueListComponent } from './critique-list.component';


@NgModule({
  declarations: [CritiqueListComponent],
  imports: [
    CommonModule,
    CritiquesRoutingModule,
    MaterialModule
  ]
})
export class CritiquesModule { }
