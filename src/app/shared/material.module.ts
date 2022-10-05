import { NgModule } from '@angular/core';
import {MatDialogModule} from "@angular/material/dialog";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatButtonModule} from "@angular/material/button";
import {MatInputModule} from "@angular/material/input";
import {MatListModule} from "@angular/material/list";
import {MatIconModule} from "@angular/material/icon";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {MatAutocompleteModule} from "@angular/material/autocomplete";

@NgModule({
  imports: [
    MatDialogModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    MatListModule,
    MatIconModule,
    MatSnackBarModule,
    MatAutocompleteModule
  ],
  exports: [
    MatDialogModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    MatListModule,
    MatIconModule,
    MatSnackBarModule,
    MatAutocompleteModule
  ],
  // providers: [{provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: {floatLabel: 'always'}}]
})
export class MaterialModule { }
