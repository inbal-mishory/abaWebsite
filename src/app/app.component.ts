import {ChangeDetectorRef, Component, OnDestroy} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {MediaMatcher} from "@angular/cdk/layout";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnDestroy{
  title = 'אליק מישורי';
  opened: boolean;
  mobileQuery: MediaQueryList;
  private _mobileQueryListener: () => void;

  constructor(public dialog: MatDialog, changeDetectorRef: ChangeDetectorRef, media: MediaMatcher) {
    this.opened = true;
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }
}
