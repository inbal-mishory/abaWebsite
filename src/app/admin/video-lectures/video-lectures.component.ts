import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { map, tap } from 'rxjs';
import { VideoService } from 'src/app/video-lecture/video.service';
import { IVideo } from '../../models/video';
import { AddEditVideoComponent } from './add-eddit-video/add-edit-video.component';

@Component({
  selector: 'app-video-lectures',
  templateUrl: './video-lectures.component.html',
  styleUrls: ['./video-lectures.component.css']
})
export class VideoLecturesComponent implements OnInit {
  videos: IVideo[];
  displayedColumns: string[] = ['title', 'link', 'date', 'actions'];
  constructor(private videoService: VideoService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.getVideos();
  }

  addVideoLecture() {
    const dialogRef = this.dialog.open(AddEditVideoComponent, {
      width: '35vw',
      height: '48vh',
      data: {
        details: '',
        isEdit: false}
    });
    dialogRef.afterClosed().subscribe(() => {
      // this.getVideos();
    });
  }

  editVideoLecture(video: IVideo) {
    const dialogRef = this.dialog.open(AddEditVideoComponent, {
      width: '35vw',
      height: '48vh',
      data: {
        details: video,
        isEdit: true}
    });
    dialogRef.afterClosed().subscribe(() => {
      // this.getVideos();
    });
  }

  getVideos() {
    this.videoService.getAllVideos().snapshotChanges().pipe(
      map(changes =>
        changes.map(video =>
          ({ ...video.payload.doc.data(), id: video.payload.doc.id })
        ),
      ),
      tap(data => {
        data.sort((first:any, second:any) => 0 - (first.date > second.date ? -1 : 1));
      })
    ).subscribe((res) => {
      this.videos = res;
    })
  }

  deleteVideoLecture(videoId: string) {
    this.videoService.delete(videoId).then();
  }

}
