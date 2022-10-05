import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, OnInit} from '@angular/core';
import {map, tap} from "rxjs/operators";
import {CatalogService} from "../../services/catalog.service";
import {Catalog} from "../../models/catalog.model";
import {MatDialog} from "@angular/material/dialog";
import {EditCatalogComponent} from "../edit-catalog/edit-catalog.component";
import {FileUploadService} from "../../services/file-upload.service";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {AngularFireDatabase, AngularFireList} from "@angular/fire/compat/database";
import {ConfirmModalComponent} from "../../shared/modals/confirm.modal/confirm.modal.component";
import {MatSnackBar} from "@angular/material/snack-bar";
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {Observable} from "rxjs";
import {AddCatalogComponent} from "../add-catalog/add-catalog.component";

@Component({
  selector: 'app-catalogs',
  templateUrl: './catalogs.component.html',
  styleUrls: ['./catalogs.component.css'],
})
export class CatalogsComponent implements OnInit {
  catalogs?: Catalog[];
  catalogs$?: Observable<Catalog[]>;
  catalogImages?: any[];
  public fileInfos?: any[];
  public baseUrl = environment.firebase.databaseURL;
  imageDetailList?: AngularFireList<any>;
  private baseCatalogsPath = `${this.baseUrl}/catalogs/`;

  constructor(private catalogService: CatalogService, private dialog: MatDialog, public uploadService: FileUploadService,
              private http: HttpClient, @Inject(AngularFireDatabase) private firebase: AngularFireDatabase,
              public cd: ChangeDetectorRef, private _snackBar: MatSnackBar, public afs: AngularFirestore) { }

  ngOnInit(): void {
    this.retrieveCatalogs();
  }

  openAddDialog() {
    const dialogRef = this.dialog.open(AddCatalogComponent, {
      width: '45vw',
      height: '50vh',
      data: {
        isEdit: false,
      }});
    dialogRef.afterClosed().subscribe((res) => {
      res.data[-1].catalog_id = res.id;
      this.catalogs = res.data;
      console.log('Created new item successfully!', res);
      // console.log(res);
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
    dialogRef.afterClosed().subscribe((res) => {
      console.log(res);
      this.retrieveCatalogs();
    })
  }

  // getCatalogFiles(): any {
  //   this.imageDetailList = this.firebase.list('catalog/images');
  //   return this.imageDetailList;
  // }

  deleteDialog(id: any) {
    const data = {
      id: id,
      name: 'Delete Catalog'
    }
    const dialogRef = this.dialog.open(ConfirmModalComponent, {
      width: '25vw',
      height: '25vh',
      data
    } );

    dialogRef.afterClosed().subscribe((res) => {
      // console.log(`Dialog result: ${result}`);
      if (res) {
        this.deleteCatalog(data);
      } else {
        console.log('something went wrong')
      }
    });
  }

  deleteCatalog(catalog: any) {
    this.catalogService.delete(catalog.id).then((res) => {
      console.log('what is ', res);
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
