import {Component, OnInit} from '@angular/core';
import {map, tap} from "rxjs/operators";
import {CatalogService} from "../../services/catalog.service";
import {Catalog} from "../../models/catalog.model";
import {MatDialog} from "@angular/material/dialog";
import {HttpClient} from "@angular/common/http";
import {ConfirmModalComponent} from "../../shared/modals/confirm.modal/confirm.modal.component";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Observable} from "rxjs";
import {AddEditCatalogComponent} from "./add-edit-catalog/add-edit-catalog.component";

@Component({
  selector: 'app-catalogs',
  templateUrl: './catalogs.component.html',
  styleUrls: ['./catalogs.component.css'],
})
export class CatalogsComponent implements OnInit {
  catalogs?: Catalog[];
  catalogs$?: Observable<Catalog[]>;

  constructor(private catalogService: CatalogService, private dialog: MatDialog,
              private http: HttpClient, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.retrieveCatalogs();
  }

  openAddDialog() {
    const dialogRef = this.dialog.open(AddEditCatalogComponent, {
      width: '35vw',
      height: '50vh',
      data: {
        isEdit: false,
      }});
    dialogRef.afterClosed().subscribe((res) => {
      this.catalogs = res.data;
    });
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

  openEditCatalogDialog(catalog: Catalog) {
    const dialogRef = this.dialog.open(AddEditCatalogComponent, {
      width: '35vw',
      height: '50vh',
      data: {isEdit: true, details: catalog}
    });
    dialogRef.afterClosed().subscribe(() => {
      this.dialog.closeAll();
    });
  }

  deleteDialog(id: any, title: string) {
    const data = {
      id: id,
      title: title
    };
    const dialogRef = this.dialog.open(ConfirmModalComponent, {
      width: '25vw',
      height: '25vh',
      data
    } );

    dialogRef.afterClosed().subscribe((res) => {
      if (res) {
        this.deleteCatalog(data);
      } else {
        console.log('something went wrong')
      }
    });
  }

  deleteCatalog(catalog: any) {
    this.catalogService.delete(catalog.id).then((res) => {
      this.openSnackBar();
    }).catch((err) => {
      console.log(err);
    });
  }

  openSnackBar(): void {
    this._snackBar.open('Catalog deleted successfully', 'close', {
      horizontalPosition: "center",
      verticalPosition: "top",
    });
  }
}
