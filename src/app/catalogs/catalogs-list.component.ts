import {Component, OnDestroy, OnInit} from '@angular/core';
import { CatalogService } from 'src/app/services/catalog.service';
import {map, takeUntil, tap} from 'rxjs/operators';
import { Catalog } from 'src/app/models/catalog.model';
import {Observable, Subject} from "rxjs";
import {FormControl} from "@angular/forms";

@Component({
  selector: 'app-catalogs-list',
  templateUrl: './catalogs-list.component.html',
  styleUrls: ['./catalogs-list.component.css']
})
export class CatalogsListComponent implements OnInit{
  term!: string;
  catalogs$?: Observable<Catalog[]>;
  catalogs?: Catalog[];
  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(private catalogService: CatalogService) {  }

  ngOnInit(): void {
    this.retrieveCatalogs();
  }

  retrieveCatalogs(): void {
    this.catalogs$ = this.catalogService.getAllCatalogs().snapshotChanges().pipe(
      takeUntil(this.destroy$),
      map(changes =>
        changes.map(c =>
          ({ catalog_id: c.payload.doc.id, ...c.payload.doc.data() })
        ),
      ),
      tap(data => {
        data.sort((first:any, second:any) => 0 - (first.year < second.year ? -1 : 1));
      }),
      tap(data => this.catalogs = data)
    );
  }

  getIdTrack(index: number, item: Catalog) {
    return item.catalog_id;
  }
}
