import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HttpClientModule} from "@angular/common/http";
import { AdminRoutingModule } from './admin-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CatalogsComponent } from './catalogs/catalogs.component';
import { CatalogComponent } from './catalogs/catalog/catalog.component';
import {MaterialModule} from "../shared/material.module";
import {AddCatalogComponent} from "./catalogs/add-catalog/add-catalog.component";
import {EditCatalogComponent} from "./catalogs/edit-catalog/edit-catalog.component";
import {ReactiveFormsModule} from "@angular/forms";
import { UploadFileComponent } from './upload-file/upload-file.component';
import {FileUploadService} from "../services/file-upload.service";
import {FilesService} from "../services/files.service";
import {AngularFireStorageModule} from "@angular/fire/compat/storage";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {FlexLayoutModule} from "@angular/flex-layout";
import {CritiquesComponent} from "./critiques/critiques.component";
import { BooksComponent } from './books/books.component';
import {AddEditCritiqueComponent} from "./critiques/addEdit-critique/addEdit-critique.component";
import { AddEditBookComponent } from './books/add-edit-book/add-edit-book.component';
import {Ng2SearchPipeModule} from "ng2-search-filter";
import { StorageComponent } from './storage/storage.component';
import { ArticlesComponent } from './articles/articles.component';
import { AddEditArticleComponent } from './articles/add-edit-article/add-edit-article.component';
import { VideoLecturesComponent } from './video-lectures/video-lectures.component';

@NgModule({
  declarations: [
    DashboardComponent,
    CatalogsComponent,
    AddCatalogComponent,
    EditCatalogComponent,
    UploadFileComponent,
    CatalogComponent,
    CritiquesComponent,
    BooksComponent,
    AddEditCritiqueComponent,
    AddEditBookComponent,
    StorageComponent,
    ArticlesComponent,
    AddEditArticleComponent,
    VideoLecturesComponent
  ],
    imports: [
        CommonModule,
        MaterialModule,
        AdminRoutingModule,
        ReactiveFormsModule,
        HttpClientModule,
        AngularFireStorageModule,
        MatCheckboxModule,
        FlexLayoutModule,
        Ng2SearchPipeModule
    ],
  providers: [FileUploadService, FilesService]
})
export class AdminModule { }
