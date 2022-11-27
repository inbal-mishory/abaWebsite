import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {IChildArticle} from "../../models/article.model";
import {MatTableDataSource} from "@angular/material/table";

@Component({
  selector: 'app-childrens-articles',
  templateUrl: './childrens-articles.component.html',
  styleUrls: ['./childrens-articles.component.css']
})
export class ChildrensArticlesComponent implements OnInit {
  @Input() articles: MatTableDataSource<any>;
  @Input() kidListLength: number;
  displayedColumns: string[] = ['title', 'magazine', 'year'];
  @ViewChild('searchInput') input: ElementRef;
  listLength: number;
  isMobile = false;
  constructor() { }

  ngOnInit(): void {
  }

  trackByUid(index, item) {
    return item.uid
  }

  applyFilter() {
    const filterValue = this.input.nativeElement.value;
    this.articles.filter = filterValue;
    this.listLength = this.articles.filteredData.length;
  }

}
