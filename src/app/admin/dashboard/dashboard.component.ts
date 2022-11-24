import {ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {ActivatedRoute, NavigationStart, Router, Routes} from "@angular/router";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit { //, OnDestroy
  activeLink = '';
  adminLinks: any[];
  routeSub$ = this.router.events.subscribe();
  constructor(public dialog: MatDialog, private route: ActivatedRoute, private router: Router,
              private changeDetector: ChangeDetectorRef) {  }

  ngOnInit(): any {
    // @ts-ignore
    this.router.events.subscribe((event: any) => {
      if (event instanceof NavigationStart) {
        return this.activeLink = event.url;
      };
    })
  }

  ngOnDestroy() {
    this.routeSub$.unsubscribe();
  }

  isActive(link: string | undefined): boolean {
    return this.activeLink.includes(link);
  }
}
