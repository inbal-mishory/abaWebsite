import { Component, OnDestroy } from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {ActivatedRoute, NavigationStart, Router} from "@angular/router";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnDestroy {
  activeLink = '';
  routeSub$ = this.router.events.subscribe();
  constructor(public dialog: MatDialog, public router: Router, private route: ActivatedRoute) {
    router.events.subscribe((event: any) => {
      if (event instanceof NavigationStart) {
        this.activeLink = event.url;
      };
    })
  }

  ngOnInit(): void {
    // this.activeLink
  }

  ngOnDestroy() {
    this.routeSub$.unsubscribe();
  }

  isActive(link: string | undefined): boolean {
    return this.activeLink.includes(link);
  }
}
