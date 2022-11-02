import {Component, OnInit, ViewChild} from '@angular/core';
import {Critique} from "../../models/critique.model";
import {CritiqueService} from "../../services/critique.service";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator, PageEvent} from "@angular/material/paginator";
import {Sort} from "@angular/material/sort";
import {AngularFireDatabase} from "@angular/fire/compat/database";
import {map, shareReplay, tap} from "rxjs";

@Component({
  selector: 'app-critique',
  templateUrl: './critique-list.component.html',
  styleUrls: ['./critique-list.component.css']
})
export class CritiqueListComponent implements OnInit {
  sortedData: MatTableDataSource<any>;
  listLength?: number;
  displayedColumns: string[] = ['title', 'museum', 'artist', 'article', 'date'];
  isMobile = false;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private critiqueService: CritiqueService, db: AngularFireDatabase) {  }

  ngOnInit(): void {
    this.getCritiques();
  }

  getCritiques() {
    this.critiqueService.getAllCritiques().snapshotChanges().pipe(
      map(changes =>
        changes.map(critique =>
          ({ ...critique.payload.doc.data(), id: critique.payload.doc.id })
        ),
      ),
      tap(data => {
        // @ts-ignore
        this.sortedData = new MatTableDataSource(data.slice());
      }),
      map(changes =>
        // @ts-ignore
        changes.map((critique: Critique) => {
          let critiqueDate = new Date(critique.date);
          critique.date = critiqueDate;
        }),
      ),
      shareReplay(1)
    ).subscribe();
  }



  doFilter(string: any) {
    this.sortedData.filter = string.target.value;
    // // @ts-ignore
    // this.listLength = this.sortedData.length;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.sortedData.filter = filterValue;
  }


  trackByUid(index, item) {
    return item.uid
  }

  sortData(sort: Sort) {
    // @ts-ignore
    const data = this.sortedData;
    if (!sort.active || sort.direction === '') {
      // @ts-ignore
      this.sortedData = data;
      return;
    }

    // @ts-ignore
    this.sortedData = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'date':
          return compare(a.date, b.date, isAsc);
        case 'title':
          return compare(a.title, b.title, isAsc);
        default:
          return 0;
      }
    });
  }
}

function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
