import { Component, OnInit } from '@angular/core';
import {map, tap} from "rxjs/operators";
import {Critique, ICritique} from "../../models/critique.model";
import {Observable, Subject} from "rxjs";
import {CritiqueService} from "../../services/critique.service";
import firebase from "firebase/compat";
import Timestamp = firebase.firestore.Timestamp;

@Component({
  selector: 'app-critique',
  templateUrl: './critique-list.component.html',
  styleUrls: ['./critique-list.component.css']
})
export class CritiqueListComponent implements OnInit {
  critiques?: ICritique[];
  critiques$?: Observable<Critique[]> | undefined;
  displayedColumns: string[] = ['title', 'museum', 'artist', 'date'];
  term!: string;
  constructor(private critiqueService: CritiqueService) { }

  ngOnInit(): void {
    this.critiques$ = this.critiqueService.getAllCritiques().snapshotChanges().pipe(
      map((changes: any) =>
        changes.map((c: any) => {
          return {id: c.payload.doc.id, ...c.payload.doc.data()};
        }),
      ),
      tap(console.log)
    );
  }


}
