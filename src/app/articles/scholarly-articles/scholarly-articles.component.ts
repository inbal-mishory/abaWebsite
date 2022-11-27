import {Component, ElementRef, OnInit, ViewChild, Input} from '@angular/core';

@Component({
  selector: 'app-scholarly-articles',
  templateUrl: './scholarly-articles.component.html',
  styleUrls: ['./scholarly-articles.component.css']
})
export class ScholarlyArticlesComponent implements OnInit {
  @Input() articles;
  @Input() listLength;
  @ViewChild('searchInput') input: ElementRef;
  displayedColumns: string[] = ['title', 'publication', 'date'];
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
