import { Injectable } from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection} from "@angular/fire/compat/firestore";
import {AngularFireDatabase} from "@angular/fire/compat/database";
import {ICritique} from "../models/critique.model";

@Injectable({
  providedIn: 'root'
})
export class CritiqueService {
  private dbPath = '/Critique';
  critiquesRef: AngularFirestoreCollection<ICritique>;

  constructor(private db: AngularFirestore, public afdb: AngularFireDatabase) {
    this.critiquesRef = db.collection(this.dbPath);
  }

  getAllCritiques(): AngularFirestoreCollection<ICritique> {
    return this.critiquesRef;
  }
}
