import { Component, OnInit } from '@angular/core';
import {Critique, ICritique} from "../../models/critique.model";
import {Observable} from "rxjs";
import {CritiqueService} from "../../services/critique.service";
import {map} from "rxjs/operators";
import {MatDialog} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";
import { AddEditCritiqueComponent} from "./addEdit-critique/addEdit-critique.component";
import {ConfirmModalComponent} from "../../shared/modals/confirm.modal/confirm.modal.component";

@Component({
  selector: 'app-critiques',
  templateUrl: './critiques.component.html',
  styleUrls: ['./critiques.component.css']
})
export class CritiquesComponent {
  critiques$?: Observable<Critique[]>;
  displayedColumns: string[] = ['title', 'museum', 'artist', 'article', 'date', 'paper', 'actions'];
  term!: string;

  constructor(private critiqueService: CritiqueService, private dialog: MatDialog, private _snackBar: MatSnackBar,) {
    this.critiques$ = this.critiqueService.getAllCritiques().snapshotChanges().pipe(
      map(changes =>
        // @ts-ignore
        changes.map((c: any) => {
          let payloadDoc = c.payload.doc;
          let newCritique = {...payloadDoc.data()};
          newCritique.id = payloadDoc.id;
          return newCritique;
        }),
      )
    );
  }

  openAddCritiqueDialog() {
    const dialogRef = this.dialog.open(AddEditCritiqueComponent, {
      width: '45vw',
      height: '50vh',
      data: {
        isEdit: false
      }});
    dialogRef.afterClosed().subscribe((res) => {
      if(res !== undefined && !res) {
        this.getCritiques();
      }
    });
  }

  openEditCritiqueDialog(critique: any) {
    const dialogRef = this.dialog.open(AddEditCritiqueComponent, {
      width: '45vw',
      height: '50vh',
      data: {
        details: critique,
        isEdit: true,
      }});
    dialogRef.afterClosed().subscribe(() => {
      this.dialog.closeAll()
    });
  }

  getCritiques() {
    this.critiques$ = this.critiqueService.getAllCritiques().snapshotChanges().pipe(
      map(changes =>
        // @ts-ignore
        changes.map((c: any) => {
          let payloadDoc = c.payload.doc;
          let newCritique = {...payloadDoc.data()};
          newCritique.id = payloadDoc.id;
          return newCritique;
        }),
      )
    )
  }

  deleteDialog(id: any, title: string) {
    const data = {
      id: id,
      title
    }
    const dialogRef = this.dialog.open(ConfirmModalComponent, {
      width: '25vw',
      height: '25vh',
      data
    } );

    dialogRef.afterClosed().subscribe((res) => {
      if (res) {
        this.deleteCritique(data);
      } else {
        console.log('something went wrong')
      }
    });
  }

  deleteCritique(critique: any) {
    this.critiqueService.delete(critique.id).then(() => {
      this.openSnackBar();
    }).catch((err) => {
      console.log(err);
    });
  }

  openSnackBar(): void {
    this._snackBar.open('Critique deleted successfully', 'close', {
      horizontalPosition: "center",
      verticalPosition: "top",
    });
  }
}
