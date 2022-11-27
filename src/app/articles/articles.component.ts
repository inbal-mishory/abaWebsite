import {Component, OnInit, ViewChild, OnDestroy, ElementRef} from '@angular/core';
import {map, Subject, tap} from "rxjs";
import {MatTableDataSource} from "@angular/material/table";
import { ArticlesService } from '../services/articles.service';
import {Article} from '../models/article.model';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.css']
})
export class ArticlesComponent implements OnInit, OnDestroy {
  displayedColumns: string[] = ['title', 'publication', 'date'];
  sortedData: MatTableDataSource<any>;
  childrenArticles: MatTableDataSource<any>;
  isMobile = false;
  listLength: number;
  kidListLength = 0;
  destroy$: Subject<boolean> = new Subject<boolean>();
  @ViewChild('searchInput') input: ElementRef;
  constructor(private articleService: ArticlesService) { }

  ngOnInit(): void {
    this.getArticles();
    this.getAllChildArticles();
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

  getAllChildArticles(): void {
    this.articleService.getAllChildrenArticles().snapshotChanges().pipe(
      map(changes =>
        changes.map(article =>
          ({ ...article.payload.doc.data(), id: article.payload.doc.id })
        ),
      ),
      tap(data => {
        this.childrenArticles = new MatTableDataSource(data.slice());
        this.kidListLength = this.childrenArticles.filteredData.length;
      }),
      tap(data => {
        data.sort((first:any, second:any) => 0 - (first.year > second.year ? -1 : 1));
      })
    ).subscribe();
  }
}
