import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CritiquesRoutingModule } from './critiques-routing.module';
import {CritiquesComponent} from "./critiques.component";
import {AddEditCritiqueComponent} from "./addEdit-critique/addEdit-critique.component";
import {MaterialModule} from "../../shared/material.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {Ng2SearchPipeModule} from "ng2-search-filter";
import {FlexLayoutModule} from "@angular/flex-layout";


@NgModule({
  declarations: [CritiquesComponent, AddEditCritiqueComponent],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    Ng2SearchPipeModule,
    FlexLayoutModule,
    CritiquesRoutingModule
  ]
})
export class CritiquesModule { }
