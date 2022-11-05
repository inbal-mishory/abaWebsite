import { Component, OnInit } from '@angular/core';
import {AngularFireDatabase} from "@angular/fire/compat/database";
import {AngularFirestoreService} from "../../services/angular-firestore.service";
import {AngularFireStorage, AngularFireStorageReference} from "@angular/fire/compat/storage";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";

@Component({
  selector: 'app-storage',
  templateUrl: './storage.component.html',
  styleUrls: ['./storage.component.css']
})
export class StorageComponent implements OnInit {
  private basePathBooks = '/books/images';
  private basePathCatalogs = '/catalogs/images';
  private basePathCritiques = '/critiques/images';
  // private basePathBooks = '/books/images';
  critiques?: AngularFireStorageReference;
  baseUrl = environment.firebase.storageBucket;
  ref: AngularFireStorageReference;
  fileUploads?: any[];
  downloadURL: Observable<string>;
  constructor(private db: AngularFireDatabase, private uploadService: AngularFirestoreService,
              private http: HttpClient, private afStorage: AngularFireStorage) { }

  ngOnInit(): void {
    this.ref = this.afStorage.ref('catalogs/images/');
    this.ref.listAll().subscribe();
    // this.uploadService.getFiles(6).snapshotChanges().pipe(
    //   map(changes =>
    //     // store the key
    //     changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
    //   )
    // ).subscribe(fileUploads => {
    //   this.fileUploads = fileUploads;
    // });
  }
}
