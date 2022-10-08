import { Component, OnInit } from '@angular/core';
import {NavigationStart, Router} from "@angular/router";

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {
  activeLink = '';
  constructor(public router: Router) {
    router.events.subscribe((event: any) => {
      if (event instanceof NavigationStart) {
        this.activeLink = event.url;
      };
    })
  }

  // ngOnDestroy() {
  //   this.router.events.unsubscribe()
  // }

  ngOnInit(): void {
  }

  isActive(link: string) {
    return this.activeLink.includes(link);
  }
}
