import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IVideo } from 'src/app/models/video';
import { VideoService } from 'src/app/video-lecture/video.service';

@Component({
  selector: 'app-add-eddit-video',
  templateUrl: './add-edit-video.component.html',
  styleUrls: ['./add-edit-video.component.css']
})
export class AddEditVideoComponent implements OnInit {
  addEditVideoForm: FormGroup;
  isEdit?: boolean;
  constructor(private fb: FormBuilder, private videoService: VideoService, public dialogRef: MatDialogRef<AddEditVideoComponent>,
              @Inject(MAT_DIALOG_DATA) readonly data: any) { }

  ngOnInit(): void {
    this.isEdit = this.data?.isEdit;
    this.initForm();
  }

  initForm() {
    this.addEditVideoForm = this.fb.group({
      title: [this.data.details.title ? this.data.details.title : '', [Validators.required]],
      id: this.data.details.id ? this.data.details.id : '',
      videoId: this.data.details.videoId ? this.data.details.videoId : '',
      thumbnail: this.data.details.thumbnail ? this.data.details.thumbnail : '',
      link: [this.data.details.link ? this.data.details.link : '', [Validators.required]],
      date: [this.data.details.date ? this.data.details.date : '', [Validators.required]],
    });
  }

  saveVideo(video: IVideo) {
    this.videoService.createVideo(video).subscribe();
    this.dialogRef.close();
  }

  updateVideo() {
    const video = this.addEditVideoForm?.getRawValue();
    this.videoService.updateVideo(video.id, video).then()
          .catch();
    this.dialogRef.close();
  }

  closeModal(): void {
    this.dialogRef.close();
  }
}
