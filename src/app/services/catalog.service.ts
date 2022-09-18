import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Catalog } from '../models/catalog.model';
import {collection, doc} from "@angular/fire/firestore";
import {AngularFireDatabase, AngularFireList} from "@angular/fire/compat/database";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CatalogService {
  private dbPath = '/Catalogs';
  catalogsList?: AngularFireList<Catalog>;

  catalogsRef: AngularFirestoreCollection<Catalog>;

  constructor(private db: AngularFirestore, public afdb: AngularFireDatabase) {
    this.catalogsRef = db.collection(this.dbPath);
    console.log(this.catalogsRef);
  }

  getCatalogList() {
    this.catalogsList = this.afdb.list('Catalogs');
  }

  getAll(): AngularFirestoreCollection<Catalog> {
    return this.catalogsRef;
  }

  create(catalog: Catalog): any {
    return this.catalogsRef.add({ ...catalog });
  }

  createCatalogDetails(catalog: Catalog): any {
    return this.catalogsList?.push(catalog);
  }

  update(id: string, data: any): Promise<void> {
    return this.catalogsRef.doc(id).update(data);
  }

  delete(id: string): Promise<void> {
    return this.catalogsRef.doc(id).delete();
  }
}
