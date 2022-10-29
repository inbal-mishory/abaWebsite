import { Component, OnInit } from '@angular/core';
import {map} from "rxjs/operators";
import { ICritique} from "../../models/critique.model";
import {CritiqueService} from "../../services/critique.service";
import {MatTableDataSource} from "@angular/material/table";

@Component({
  selector: 'app-critique',
  templateUrl: './critique-list.component.html',
  styleUrls: ['./critique-list.component.css']
})
export class CritiqueListComponent implements OnInit {
  critiques?: ICritique[];
  dataSource?: MatTableDataSource<ICritique[]>;
  listLength?: number;
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
      this.dataSource = new MatTableDataSource<ICritique[]>(res);
    });
  }


  public doFilter = (value: any) => {
    this.dataSource.filter = value.trim();
    this.listLength = this.dataSource.filteredData.length;
  }
}
