import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Catalog} from "../../../models/catalog.model";

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.css']
})
export class CatalogComponent implements OnInit {
  @Input() catalog?: Catalog;
  @Output() openEditCat = new EventEmitter;
  @Output() deleteCat = new EventEmitter;
  constructor() { }

  ngOnInit(): void {
  }

  onOpenEditCat(catalog: any) {
    this.openEditCat.emit(catalog)
  }

  deleteCatalog(id: any) {
    this.deleteCat.emit(id);
  }
}
