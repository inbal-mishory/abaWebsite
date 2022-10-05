import {Component, OnDestroy, OnInit} from '@angular/core';
import { CatalogService } from 'src/app/services/catalog.service';
import {map, startWith, tap, filter} from 'rxjs/operators';
import { Catalog } from 'src/app/models/catalog.model';
import {Observable} from "rxjs";
import {FormControl} from "@angular/forms";

@Component({
  selector: 'app-catalogs-list',
  templateUrl: './catalogs-list.component.html',
  styleUrls: ['./catalogs-list.component.css']
})
export class CatalogsListComponent implements OnInit, OnDestroy{
  currentCatalog?: Catalog;
  // currentIndex = -1;
  title = '';
  term!: string;
  catalogs$?: Observable<Catalog[]>;
  control = new FormControl(null);
  options?: string[];
  filteredOptions?: Observable<string[]>;
  // filteredCatalogs?: Observable<string[]>;

  constructor(private catalogService: CatalogService) {  }

  ngOnInit(): void {
    this.retrieveCatalogs();
  }

  ngOnDestroy() {
    this.catalogs$?.subscribe()
  }

  refreshList(): void {
    this.currentCatalog = undefined;
    this.retrieveCatalogs();
  }

  retrieveCatalogs(): void {
    this.catalogs$ = this.catalogService.getAllCatalogs().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ catalog_id: c.payload.doc.id, ...c.payload.doc.data() })
        ),
      ),
      tap(data => {
        data.sort((first:any, second:any) => 0 - (first.year < second.year ? -1 : 1));
      })
    );
  }

  setActiveCatalog(catalog: Catalog, index: number): void {
    this.currentCatalog = catalog;
  }
}
