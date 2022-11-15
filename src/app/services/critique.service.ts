import { Injectable } from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection} from "@angular/fire/compat/firestore";
import {ICritique} from "../models/critique.model";

@Injectable({
  providedIn: 'root'
})
export class CritiqueService {
  private dbPath = '/Critique';
  critiquesRef: AngularFirestoreCollection<ICritique>;

  constructor(private db: AngularFirestore) {
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
