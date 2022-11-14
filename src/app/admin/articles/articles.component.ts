import { Component, OnInit } from '@angular/core';
import { map, tap } from 'rxjs';
import { IArticle } from 'src/app/models/article.model';
import { ArticlesService } from 'src/app/services/articles.service';
import {MatDialog} from "@angular/material/dialog";
import {AddEditArticleComponent} from "./add-edit-article/add-edit-article.component";
import {ConfirmModalComponent} from "../../shared/modals/confirm.modal/confirm.modal.component";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.css']
})
export class ArticlesComponent implements OnInit {
  articles: IArticle[];
  displayedColumns: string[] = ['title', 'publication', 'date', 'actions'];
  constructor(private articleService: ArticlesService, private dialog: MatDialog, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.getArticles();
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

  createArticle() {
    const dialogRef = this.dialog.open(AddEditArticleComponent, {
      width: '35vw',
      height: '50vh',
      data: {isEdit: false}
    });
    dialogRef.afterClosed().subscribe(() => {
      this.getArticles();
    })
  }

  deleteDialog(id: string, title: string) {
    const data = {
      id: id,
      title
    }
    const dialogRef = this.dialog.open(ConfirmModalComponent, {
      width: '25vw',
      height: '25vh',
      data
    } );

    dialogRef.afterClosed().subscribe((res) => {
      if (res) {
        this.deleteArticle(id);
      } else {
        console.log('something went wrong')
      }
    });
  }

  openEditArticle(article: IArticle) {
    const dialogRef = this.dialog.open(AddEditArticleComponent, {
      width: '35vw',
      height: '50vh',
      data: {
        details: article,
        isEdit: true
      }
    });
    dialogRef.afterClosed().subscribe(() => {
      this.getArticles();
    })
  }

  deleteArticle(bookId: string) {
    this.articleService.delete(bookId).then((res) => {
      this.openSnackBar();
    }).catch((err) => {
      console.log(err);
    });
  }

  openSnackBar(): void {
    this._snackBar.open('Book deleted successfully', 'close', {
      horizontalPosition: "center",
      verticalPosition: "top",
    });
  }
}
