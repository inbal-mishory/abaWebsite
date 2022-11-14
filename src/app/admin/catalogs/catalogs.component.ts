import {ChangeDetectorRef, Component, Inject, OnInit} from '@angular/core';
import {map, tap} from "rxjs/operators";
import {CatalogService} from "../../services/catalog.service";
import {Catalog} from "../../models/catalog.model";
import {MatDialog} from "@angular/material/dialog";
import {EditCatalogComponent} from "./edit-catalog/edit-catalog.component";
import {FileUploadService} from "../../services/file-upload.service";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {AngularFireDatabase, AngularFireList} from "@angular/fire/compat/database";
import {ConfirmModalComponent} from "../../shared/modals/confirm.modal/confirm.modal.component";
import {MatSnackBar} from "@angular/material/snack-bar";
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {Observable, Subscription} from "rxjs";
import {AddCatalogComponent} from "./add-catalog/add-catalog.component";

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
    const dialogRef = this.dialog.open(AddCatalogComponent, {
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
    const dialogRef = this.dialog.open(EditCatalogComponent, {
      width: '35vw',
      height: '50vh',
      data: catalog
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
