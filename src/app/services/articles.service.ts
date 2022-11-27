import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import {IArticle, IChildArticle} from '../models/article.model';

@Injectable({
  providedIn: 'root'
})
export class ArticlesService {
  dbPath = '/Articles';
  dbChildrenPath = '/Childrens-magazines';
  articlesRef: AngularFirestoreCollection<IArticle>;
  childArticlesRef: AngularFirestoreCollection<IChildArticle>;

  constructor(private db: AngularFirestore) {
    this.articlesRef = db.collection(this.dbPath);
    this.childArticlesRef = db.collection(this.dbChildrenPath);
   }

  getAllArticles(): AngularFirestoreCollection<IArticle> {
    return this.articlesRef;
  }

  getAllChildrenArticles(): AngularFirestoreCollection<IChildArticle> {
    return this.childArticlesRef;
  }

  updateArticle(id: string | undefined, data: any) {
    return this.articlesRef.doc(id).update(data);
  }

  updateChildArticle(id: string | undefined, data: any) {
    debugger;
    return this.childArticlesRef.doc(id).update(data);
  }

  createArticle(article: IArticle): Promise<any> {
    return this.articlesRef.add({ ...article });
  }

  createChildArticle(article: IChildArticle): Promise<any> {
    return this.childArticlesRef.add({ ...article });
  }

  delete(id: string): Promise<void> {
    return this.articlesRef.doc(id).delete();
  }

  deleteChildArticle(id: string): Promise<void> {
    return this.childArticlesRef.doc(id).delete();
  }
}
