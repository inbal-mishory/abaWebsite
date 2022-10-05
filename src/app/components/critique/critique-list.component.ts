import { Component, OnInit } from '@angular/core';
import {map, tap} from "rxjs/operators";
import {Critique, ICritique} from "../../models/critique.model";
import {Observable} from "rxjs";
import {CritiqueService} from "../../services/critique.service";

@Component({
  selector: 'app-critique',
  templateUrl: './critique-list.component.html',
  styleUrls: ['./critique-list.component.css']
})
export class CritiqueListComponent implements OnInit {
  critiques?: ICritique[];
  critiques$?: Observable<Critique[]>
  constructor(private critiqueService: CritiqueService) { }

  ngOnInit(): void {
    this.critiques$ = this.critiqueService.getAllCritiques().snapshotChanges().pipe(
      map(changes =>
        changes.map(c => {
          let newCritique = {id: c.payload.doc.id, ...c.payload.doc.data()};
          let newDate = new Date(0).setUTCSeconds(c.payload.doc.data().date['seconds']);
          newCritique.date = newDate;
          return newCritique;
        }),
      )
      // tap(data => {
      //   data.sort((first:any, second:any) => 0 - (first.year > second.year ? -1 : 1));
      // })
    );
  }

}
