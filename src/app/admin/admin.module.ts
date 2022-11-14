import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HttpClientModule} from "@angular/common/http";
import { AdminRoutingModule } from './admin-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import {FileUploadService} from "../services/file-upload.service";
import {FilesService} from "../services/files.service";
import {AngularFireStorageModule} from "@angular/fire/compat/storage";
import { ConfirmModalComponent } from '../shared/modals/confirm.modal/confirm.modal.component';
import {MaterialModule} from "../shared/material.module";

@NgModule({
  declarations: [
    DashboardComponent,
    ConfirmModalComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    HttpClientModule,
    AngularFireStorageModule,
    MaterialModule,
  ],
  providers: [FileUploadService, FilesService]
})
export class AdminModule { }
