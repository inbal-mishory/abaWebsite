import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VideoLectureRoutingModule } from './video-lecture-routing.module';
import { VideoLectureComponent } from './video-lecture.component';


@NgModule({
  declarations: [
    VideoLectureComponent
  ],
  imports: [
    CommonModule,
    VideoLectureRoutingModule
  ]
})
export class VideoLectureModule { }
