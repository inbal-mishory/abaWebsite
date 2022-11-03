import { Injectable } from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection} from "@angular/fire/compat/firestore";
import {AngularFireDatabase} from "@angular/fire/compat/database";
import {ICritique} from "../models/critique.model";
import {DataSource} from "@angular/cdk/collections";
import {Observable} from "rxjs";

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

  createCritique(critique: ICritique): any {
    return this.critiquesRef.add({ ...critique });
  }

  updateCritique(id: string, data: any): Promise<void> {
    return this.critiquesRef.doc(id).update(data);
  }

  delete(id: string): Promise<void> {
    return this.critiquesRef.doc(id).delete();
  }
}
