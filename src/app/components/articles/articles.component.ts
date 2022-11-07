import {Component, OnInit, ViewChild} from '@angular/core';
import {ArticlesService} from "../../services/articles.service";
import {map, tap} from "rxjs";
import {Article, IArticle} from "../../models/article.model";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.css']
})
export class ArticlesComponent implements OnInit {
  displayedColumns: string[] = ['title', 'publication', 'link']; //, 'date'
  sortedData: MatTableDataSource<any>;
  isMobile = false;
  listLength: number;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(private articleService: ArticlesService) { }

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
        this.sortedData = new MatTableDataSource(data.slice());
      }),
      map(changes =>
        changes.map((article: Article) => {
          let articleDate = new Date(article.date);
          article.date = articleDate;
        }),
      ),
      tap(data => {
        data.sort((first:any, second:any) => 0 - (first.year > second.year ? -1 : 1));
      }),
    ).subscribe();
  }

  deleteDialog(id: string) {

  }

  trackByUid(index, item) {
    return item.uid
  }

  doFilter(value: any) {
    this.sortedData.filter = value.target.value;
  }
}
