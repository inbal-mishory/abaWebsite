import { Component, OnInit } from '@angular/core';
import {Observable} from "rxjs";
import {FileUploadService} from "../../services/file-upload.service";
import {FileUpload} from "../../models/file.model";
import {AngularFireList} from "@angular/fire/compat/database";
import {AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask} from "@angular/fire/compat/storage";
import {map, tap} from "rxjs/operators";
import {UploadMetadata} from "@angular/fire/compat/storage/interfaces";

export interface FilesUploadMetadata {
  uploadProgress$: Observable<number>;
  downloadUrl$: Observable<string>;
}

@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.css']
})
export class UploadFileComponent implements OnInit {
  ref: AngularFireStorageReference;
  task: AngularFireUploadTask;
  uploadState: Observable<string>;
  uploadProgress: Observable<number>;
  downloadURL: Observable<any>;
  selectedFiles?: FileList;
  currentFile?: File;
  progress = 0;
  message = '';
  fileInfos?: AngularFireList<FileUpload>;

  constructor(private uploadService: FileUploadService, private afStorage: AngularFireStorage) { }

  ngOnInit(): void {

  }

  selectFile(event: any): void {
    this.selectedFiles = event.target.files;
  }

  // upload(): void {
  //   this.progress = 0;
  //   if (this.selectedFiles) {
  //     const file: File | null = this.selectedFiles.item(0);
  //     if (file) {
  //       this.currentFile = file;
  //       this.uploadService.uploadFileAndGetMetadata(this.currentFile).subscribe({
  //         next: (event: any) => {
  //           if (event.type === HttpEventType.UploadProgress) {
  //             this.progress = Math.round(100 * event.loaded / event.total);
  //           } else if (event instanceof HttpResponse) {
  //             this.message = event.body.message;
  //             this.fileInfos = this.uploadService.getFiles(10);
  //           }
  //         },
  //         error: (err: any) => {
  //           console.log(err);
  //           this.progress = 0;
  //           if (err.error && err.error.message) {
  //             this.message = err.error.message;
  //           } else {
  //             this.message = 'Could not upload the file!';
  //           }
  //           this.currentFile = undefined;
  //         }
  //       });
  //     }
  //     this.selectedFiles = undefined;
  //   }
  // }

  upload(event) {
    const id = Math.random().toString(36).substring(2);
    this.ref = this.afStorage.ref('catalogs/images');
    this.task['name'] = event.target.files[0].name;
    this.task = this.ref.put(event.target.files[0]);
    this.uploadState = this.task.snapshotChanges().pipe(map(s => s.state));
    this.uploadProgress = this.task.percentageChanges();
    // this.downloadURL = this.task.then(promise => console.log(promise));
  }
}
