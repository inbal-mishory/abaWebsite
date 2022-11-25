import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Catalog } from '../models/catalog.model';
import {AngularFireDatabase, AngularFireList} from "@angular/fire/compat/database";

@Injectable({
  providedIn: 'root'
})
export class CatalogService {
  private dbPath = '/Catalogs';
  catalogsList?: AngularFireList<Catalog>;

  catalogsRef: AngularFirestoreCollection<Catalog>;

  constructor(private db: AngularFirestore, public afdb: AngularFireDatabase) {
    this.catalogsRef = db.collection(this.dbPath);
  }

  getAllCatalogs(): AngularFirestoreCollection<Catalog> {
    return this.catalogsRef;
  }

  create(catalog: Catalog): any {
    return this.catalogsRef.add({ ...catalog });
  }

  createCatalogDetails(catalog: Catalog): any {
    return this.catalogsList?.push(catalog);
  }

  getCatalogById(catalog_id: string) {
    return this.catalogsRef.doc(catalog_id);
  }

  update(id: string, data: any): Promise<void> {
    return this.catalogsRef.doc(id).update(data);
  }

  delete(id: string): Promise<void> {
    return this.catalogsRef.doc(id).delete();
  }
}
