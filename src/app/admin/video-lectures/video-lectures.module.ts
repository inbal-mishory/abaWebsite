import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VideoLecturesRoutingModule } from './video-lectures-routing.module';
import {VideoLecturesComponent} from "./video-lectures.component";
import {AddEditVideoComponent} from "./add-eddit-video/add-edit-video.component";
import {MaterialModule} from "../../shared/material.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {Ng2SearchPipeModule} from "ng2-search-filter";
import {FlexLayoutModule} from "@angular/flex-layout";


@NgModule({
  declarations: [VideoLecturesComponent, AddEditVideoComponent],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    Ng2SearchPipeModule,
    FlexLayoutModule,
    VideoLecturesRoutingModule
  ]
})
export class VideoLecturesModule { }
