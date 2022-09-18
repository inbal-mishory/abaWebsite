import { Injectable } from '@angular/core';
import {HttpClient, HttpEvent, HttpRequest} from "@angular/common/http";
import {finalize, Observable} from "rxjs";
import {environment} from "../../environments/environment";
import {AngularFireDatabase, AngularFireList} from "@angular/fire/compat/database";
import {FileUpload} from "../models/file.model";
import {AngularFireStorage} from "@angular/fire/compat/storage";
import firebase from "firebase/compat";

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {
  private baseUrl = environment.firebase.storageBucket;
  private basePath = '/catalogs';
  uploadTask?: firebase.storage.UploadTask;

  constructor(private http: HttpClient, private db: AngularFireDatabase, private storage: AngularFireStorage) { }

  uploadFileAndGetMetadata(file: File): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();
    formData.append('file', file);
    const req = new HttpRequest('POST', `${this.baseUrl}/upload`, formData, {
      reportProgress: true,
      responseType: 'json'
    });
    return this.http.request(req);
  }

  getFiles(numberItems: number): AngularFireList<FileUpload> {
    return this.db.list(this.basePath, ref =>
      ref.limitToLast(numberItems));
  }

  pushFileToStorage(fileUpload: FileUpload): Observable<number | undefined> {
    const filePath = `${this.basePath}/${fileUpload.file.name}`;
    const storageRef = this.storage.ref(filePath);
    const uploadTask = this.storage.upload(filePath, fileUpload.file);
    uploadTask.snapshotChanges().pipe(
      finalize(() => {
        storageRef.getDownloadURL().subscribe(downloadURL => {
          fileUpload.url = downloadURL;
          fileUpload.name = fileUpload.file.name;
          this.saveFileData(fileUpload);
        });
      })
    ).subscribe();

    return uploadTask.percentageChanges();
  }

  saveFileData(fileUpload: FileUpload): void {
    this.db.list(this.basePath).push(fileUpload);
  }

}
