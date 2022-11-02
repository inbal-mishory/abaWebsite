import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { IArticle } from '../models/article.model';
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ArticlesService {
  dbPath = '/Articles';
  articlesRef: AngularFirestoreCollection<IArticle>

  constructor(private db: AngularFirestore) {
    this.articlesRef = db.collection(this.dbPath);
   }

  getAllArticles(): AngularFirestoreCollection<IArticle> {
    return this.articlesRef;
  }

  updateArticle(id: string | undefined, data: any) {
    return this.articlesRef.doc(id).update(data);
  }

  createArticle(article: IArticle): Promise<any> {
    return this.articlesRef.add({ ...article });
  }

  delete(id: string): Promise<void> {
    return this.articlesRef.doc(id).delete();
  }
}
