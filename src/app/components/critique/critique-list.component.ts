import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Critique} from "../../models/critique.model";
import {CritiqueService} from "../../services/critique.service";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator, PageEvent} from "@angular/material/paginator";
import {MatSort, Sort} from "@angular/material/sort";
import {AngularFireDatabase} from "@angular/fire/compat/database";
import {map, shareReplay, tap} from "rxjs";

@Component({
  selector: 'app-critique',
  templateUrl: './critique-list.component.html',
  styleUrls: ['./critique-list.component.css']
})
export class CritiqueListComponent {
  sortedData: MatTableDataSource<any>;
  listLength?: number;
  displayedColumns: string[] = ['title', 'museum', 'artist', 'paper', 'article', 'date'];
  isMobile = false;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild('searchInput') input:ElementRef;

  constructor(private critiqueService: CritiqueService, db: AngularFireDatabase) {  }

  ngAfterViewInit(): void {
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
          critique.date = critiqueDate.toLocaleDateString();
        }),
      ),
      shareReplay(1)
    ).subscribe();
  }


  applyFilter(filterValue?: string):void {
    filterValue = this.input.nativeElement.value;
    this.sortedData.filter = filterValue;
  }

  trackByUid(index, item) {
    return item.uid
  }
}
