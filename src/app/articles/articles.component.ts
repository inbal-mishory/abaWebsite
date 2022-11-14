import {Component, OnInit, ViewChild, OnDestroy, ElementRef} from '@angular/core';
import {map, Subject, tap} from "rxjs";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import { ArticlesService } from '../services/articles.service';
import { Article } from '../models/article.model';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.css']
})
export class ArticlesComponent implements OnInit, OnDestroy {
  displayedColumns: string[] = ['title', 'publication', 'link', 'date'];
  sortedData: MatTableDataSource<any>;
  isMobile = false;
  listLength: number;
  destroy$: Subject<boolean> = new Subject<boolean>();
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild('searchInput') input: ElementRef;
  constructor(private articleService: ArticlesService) { }

  ngOnInit(): void {
    this.getArticles();
  }

  ngOnDestroy() {
    this.destroy$.next;
    this.destroy$.unsubscribe();
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
        this.listLength = this.sortedData.filteredData.length;
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

  trackByUid(index, item) {
    return item.uid
  }

  applyFilter() {
    const filterValue = this.input.nativeElement.value;
    this.sortedData.filter = filterValue;
    this.listLength = this.sortedData.filteredData.length;
  }
}
