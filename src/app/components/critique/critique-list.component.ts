import { Component, OnInit } from '@angular/core';
import {map, tap} from "rxjs/operators";
import {Critique, ICritique} from "../../models/critique.model";
import {Observable} from "rxjs";
import {CritiqueService} from "../../services/critique.service";
import {MatTableDataSource} from "@angular/material/table";

@Component({
  selector: 'app-critique',
  templateUrl: './critique-list.component.html',
  styleUrls: ['./critique-list.component.css']
})
export class CritiqueListComponent implements OnInit {
  critiques?: ICritique[];
  dataSource?: MatTableDataSource<Element>;
  // critiques$?: Observable<Critique[]> | undefined;
  displayedColumns: string[] = ['title', 'museum', 'artist', 'article', 'date'];
  term!: string;
  isMobile = false;
  displayNoRecords = false;
  constructor(private critiqueService: CritiqueService) { }

  ngOnInit(): void {
    this.critiqueService.getAllCritiques().snapshotChanges().pipe(
      map((changes: any) =>
        changes.map((c: any) => {
          return {id: c.payload.doc.id, ...c.payload.doc.data()};
        }),
      )
    ).subscribe((res: any) => {
      this.isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      console.log(this.isMobile);
      this.dataSource = new MatTableDataSource<Element>(res);
    });
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    this.displayNoRecords = this.dataSource.filteredData.length === 0;
  }
}
