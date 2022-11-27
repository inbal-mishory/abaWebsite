import {Component, Input, OnInit} from '@angular/core';
import {IArticle} from "../../../models/article.model";
import {ConfirmModalComponent} from "../../../shared/modals/confirm.modal/confirm.modal.component";
import {ArticlesService} from "../../../services/articles.service";
import {MatDialog} from "@angular/material/dialog";
import {AddEditArticleComponent} from "./add-edit-article/add-edit-article.component";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-articles-list',
  templateUrl: './articles-list.component.html',
  styleUrls: ['./articles-list.component.css']
})
export class ArticlesListComponent implements OnInit {
  @Input() articles: IArticle[];
  displayedColumns: string[] = ['title', 'publication', 'date', 'actions'];
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

  openEditArticle(article: IArticle) {
    const dialogRef = this.dialog.open(AddEditArticleComponent, {
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
