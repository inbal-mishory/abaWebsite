import { Component, OnInit } from '@angular/core';
import { DocumentChangeAction } from '@angular/fire/compat/firestore';
import { tap, Observable, map } from 'rxjs';
import { IVideo } from '../models/video';
import { VideoService } from './video.service';

@Component({
  selector: 'app-video-lecture',
  templateUrl: './video-lecture.component.html',
  styleUrls: ['./video-lecture.component.css']
})
export class VideoLectureComponent implements OnInit {
  videosList?: IVideo[];
  thumbnail?: string;
  constructor(private videoService: VideoService) { }

  ngOnInit(): void {
    this.getVideos();
  }

  getVideos(): void{
    this.videoService.getAllVideos().snapshotChanges().pipe(
      map(changes =>
        changes.map(c => {
          const vidId = c.payload.doc.data().link.slice(16);
          return { videoId: vidId, id: c.payload.doc.id, ...c.payload.doc.data() }
      })
      ),
    ).subscribe((res) => {
      this.videosList = res;
      console.log(this.videosList);
    });
  }

}
