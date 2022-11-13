import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VideoLectureComponent } from './video-lecture.component';

const routes: Routes = [{ path: '', component: VideoLectureComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VideoLectureRoutingModule { }
