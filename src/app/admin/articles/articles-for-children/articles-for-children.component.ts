import {Component, Input, OnInit} from '@angular/core';
import {IArticle, IChildArticle} from "../../../models/article.model";
import {ConfirmModalComponent} from "../../../shared/modals/confirm.modal/confirm.modal.component";
import {AddEditArticleComponent} from "../articles-list/add-edit-article/add-edit-article.component";
import {ArticlesService} from "../../../services/articles.service";
import {MatDialog} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";
import {AddEditChildArticleComponent} from "./add-edit-child-article/add-edit-child-article.component";

@Component({
  selector: 'app-articles-for-children',
  templateUrl: './articles-for-children.component.html',
  styleUrls: ['./articles-for-children.component.css']
})
export class ArticlesForChildrenComponent implements OnInit {
  @Input() childrenArticles: IChildArticle[];
  displayedColumns: string[] = ['title', 'magazine', 'year', 'actions'];
  constructor(private articleService: ArticlesService, private dialog: MatDialog, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
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

  openEditArticle(article: IChildArticle) {
    const dialogRef = this.dialog.open(AddEditChildArticleComponent, {
      width: '35vw',
      height: '45vh',
      data: {
        details: article,
        isEdit: true
      }
    });
    dialogRef.afterClosed().subscribe(() => {
      // this.getArticles();
    })
  }

  deleteArticle(bookId: string) {
    this.articleService.deleteChildArticle(bookId).then((res) => {
      this.openSnackBar('Article deleted successfully');
    }).catch((err) => {
      this.openSnackBar('Something went wrong, ' + err);
    });
  }

  openSnackBar(msg): void {
    this._snackBar.open(msg, 'close', {
      horizontalPosition: "center",
      verticalPosition: "top",
    });
  }

}
