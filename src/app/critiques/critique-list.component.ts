import {AfterViewInit, ChangeDetectorRef, Component, ElementRef, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {AngularFireDatabase} from "@angular/fire/compat/database";
import {map, shareReplay, tap} from "rxjs";
import { CritiqueService } from '../services/critique.service';
import {Critique} from "../models/critique.model";

@Component({
  selector: 'app-critique',
  templateUrl: './critique-list.component.html',
  styleUrls: ['./critique-list.component.css']
})
export class CritiqueListComponent implements AfterViewInit {
  sortedData: any;
  listLength?: number;
  displayedColumns: string[] = ['title', 'museum', 'artist', 'paper', 'date'];//
  isMobile = false;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild('searchInput') input: ElementRef;

  constructor(private critiqueService: CritiqueService, db: AngularFireDatabase, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.getCritiques();
  }
  ngAfterViewInit() {
    // this.sortedData ? this.sortedData.sort = this.sort : 'title';
  }

  getCritiques() {
    this.critiqueService.getAllCritiques().snapshotChanges().pipe(
      map(changes =>
        changes.map(critique =>
          ({ ...critique.payload.doc.data(), id: critique.payload.doc.id })
        ),
      ),
      tap(data => {
        data.sort((first:any, second:any) => 0 - (first.date < second.date ? -1 : 1));
      }),
      tap(data => {
        this.sortedData = new MatTableDataSource(data.slice());
        // this.sort.disableClear = true;
        this.listLength = this.sortedData.filteredData.length;
      }),
      map(changes => {
          changes.map((critique: Critique) => {
            let critiqueDate = new Date(critique.date);
            critique.date = critiqueDate.toDateString();
          });
        this.sortedData.sort = this.sort
        }
      ),
      shareReplay(1)
    ).subscribe( () => this.sortedData.sort = this.sort );

  }


  applyFilter(filterValue?: string):void {
    filterValue = this.input.nativeElement.value;
    this.sortedData.filter = filterValue;
    this.listLength = this.sortedData.filteredData.length;
  }

  trackByUid(index, item) {
    return item.uid
  }
}
