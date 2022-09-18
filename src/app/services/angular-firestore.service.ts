import { Injectable } from '@angular/core';
import {AngularFirestoreDocument} from "@angular/fire/compat/firestore";
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class AngularFirestoreService {

  constructor(private db: AngularFirestore) { }
  catalog?: AngularFirestoreDocument<any>;
  // tutorial = db.doc('tutorial');


  createCatalog() {
    const tutRef = this.db.doc('catalogs/');

// set() for destructive updates
    tutRef.set({ title: 'zkoder Tutorial'});
  }
}
