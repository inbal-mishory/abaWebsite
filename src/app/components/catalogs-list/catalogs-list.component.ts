import { Component, OnInit } from '@angular/core';
import { CatalogService } from 'src/app/services/catalog.service';
import { map } from 'rxjs/operators';
import { Catalog } from 'src/app/models/catalog.model';

@Component({
  selector: 'app-catalogs-list',
  templateUrl: './catalogs-list.component.html',
  styleUrls: ['./catalogs-list.component.css']
})
export class CatalogsListComponent implements OnInit {
  catalogs?: Catalog[];
  currentCatalog?: Catalog;
  currentIndex = -1;
  title = '';

  constructor(private catalogService: CatalogService) { }

  ngOnInit(): void {
    this.retrieveCatalogs();
  }

  refreshList(): void {
    this.currentCatalog = undefined;
    this.currentIndex = -1;
    this.retrieveCatalogs();
  }

  retrieveCatalogs(): void {
    this.catalogService.getAll().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ id: c.payload.doc.id, ...c.payload.doc.data() })
        )
      )
    ).subscribe(data => {
      this.catalogs = data;
    });
  }

  setActiveCatalog(catalog: Catalog, index: number): void {
    this.currentCatalog = catalog;
    this.currentIndex = index;
  }
}
