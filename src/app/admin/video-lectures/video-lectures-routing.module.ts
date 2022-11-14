import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {VideoLecturesComponent} from "./video-lectures.component";

const routes: Routes = [
  {path: '', component: VideoLecturesComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VideoLecturesRoutingModule { }
