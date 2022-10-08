import { Component, OnInit } from '@angular/core';
import {Critique, ICritique} from "../../models/critique.model";
import {Observable} from "rxjs";
import {CritiqueService} from "../../services/critique.service";
import {map} from "rxjs/operators";
import {MatDialog} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";
import {environment} from "../../../environments/environment";
import { AddEditCritiqueComponent} from "./addEdit-critique/addEdit-critique.component";
import firebase from "firebase/compat";

@Component({
  selector: 'app-critiques',
  templateUrl: './critiques.component.html',
  styleUrls: ['./critiques.component.css']
})
export class CritiquesComponent implements OnInit {
  critiques?: ICritique[];
  critiques$?: Observable<Critique[]>;
  public baseUrl = environment.firebase.databaseURL;
  constructor(private critiqueService: CritiqueService, private dialog: MatDialog, private _snackBar: MatSnackBar,) { }

  ngOnInit(): void {
    this.getCritiques();
  }

  openAddEditCritiqueDialog(critique: any) {
    const dialogRef = this.dialog.open(AddEditCritiqueComponent, {
      width: '45vw',
      height: '50vh',
      data: {
        details: critique ? critique : '',
        isEdit: critique !== '',
      }});
    dialogRef.afterClosed().subscribe((res) => {
      if(res !== undefined && !res) {
        this.getCritiques();
        console.log(res);
      }
    });
  }

  getCritiques() {

    this.critiques$ = this.critiqueService.getAllCritiques().snapshotChanges().pipe(
      map(changes =>
        // @ts-ignore
        changes.map((c: any) => {
          let payloadDoc = c.payload.doc;
          let newCritique = {id: payloadDoc.id, ...payloadDoc.data()};
          return newCritique;
        }),
      )
    )
  }
}
