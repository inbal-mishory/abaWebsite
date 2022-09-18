import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HttpClientModule} from "@angular/common/http";
import { AdminRoutingModule } from './admin-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CatalogsComponent } from './catalogs/catalogs.component';
import { CatalogComponent } from './catalogs/catalog/catalog.component';
import {MaterialModule} from "../shared/material.module";
import {AddCatalogComponent} from "./add-catalog/add-catalog.component";
import {EditCatalogComponent} from "./edit-catalog/edit-catalog.component";
import {ReactiveFormsModule} from "@angular/forms";
import { UploadFileComponent } from './upload-file/upload-file.component';
import {FileUploadService} from "../services/file-upload.service";
import {FilesService} from "../services/files.service";
import {AngularFireStorageModule} from "@angular/fire/compat/storage";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {FlexLayoutModule} from "@angular/flex-layout";
import {AppModule} from "../app.module";


@NgModule({
  declarations: [
    DashboardComponent,
    CatalogsComponent,
    AddCatalogComponent,
    EditCatalogComponent,
    UploadFileComponent,
    CatalogComponent
  ],
    imports: [
        CommonModule,
        MaterialModule,
        AdminRoutingModule,
        ReactiveFormsModule,
        HttpClientModule,
        AngularFireStorageModule,
        MatCheckboxModule,
        FlexLayoutModule
    ],
  providers: [FileUploadService, FilesService]
})
export class AdminModule { }
