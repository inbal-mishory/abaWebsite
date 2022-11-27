import { Component, OnInit } from '@angular/core';
import { map, tap } from 'rxjs';
import {IArticle, IChildArticle} from 'src/app/models/article.model';
import { ArticlesService } from 'src/app/services/articles.service';
import {MatDialog} from "@angular/material/dialog";
import {AddEditArticleComponent} from "./articles-list/add-edit-article/add-edit-article.component";
import {MatSnackBar} from "@angular/material/snack-bar";
import {
  AddEditChildArticleComponent
} from "./articles-for-children/add-edit-child-article/add-edit-child-article.component";

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.css']
})
export class ArticlesComponent implements OnInit {
  articles: IArticle[];
  childrenArticles: IChildArticle[];
  constructor(private articleService: ArticlesService, private dialog: MatDialog, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.getArticles();
    this.getAllChildArticles();
  }

  getArticles(): void {
    this.articleService.getAllArticles().snapshotChanges().pipe(
      map(changes =>
        changes.map(article =>
          ({ ...article.payload.doc.data(), id: article.payload.doc.id })
        ),
      ),
      tap(data => {
        data.sort((first:any, second:any) => 0 - (first.year > second.year ? -1 : 1));
      })
    ).subscribe((res) => this.articles = res);
  }

  getAllChildArticles(): void {
    this.articleService.getAllChildrenArticles().snapshotChanges().pipe(
      map(changes =>
        changes.map(article =>
          ({ ...article.payload.doc.data(), id: article.payload.doc.id })
        ),
      ),
      tap(data => {
        data.sort((first:any, second:any) => 0 - (first.year > second.year ? -1 : 1));
      })
    ).subscribe((res) => this.childrenArticles = res);
  }

  createArticle() {
    const dialogRef = this.dialog.open(AddEditArticleComponent, {
      width: '35vw',
      height: '45vh',
      data: {isEdit: false}
    });
    dialogRef.afterClosed().subscribe(() => {
      this.getArticles();
    })
  }

  createChildArticle() {
    const dialogRef = this.dialog.open(AddEditChildArticleComponent, {
      width: '35vw',
      height: '45vh',
      data: {isEdit: false}
    });
    dialogRef.afterClosed().subscribe(() => {
      this.getAllChildArticles();
    })
  }
}
