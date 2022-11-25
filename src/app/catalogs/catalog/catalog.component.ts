import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {CatalogService} from "../../services/catalog.service";

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.css']
})
export class CatalogComponent implements OnInit {
  catalogId: string;
  catalogDetails: any;

  constructor(private route: ActivatedRoute, private catalogService: CatalogService) { }

  ngOnInit(): void {
    this.catalogId = this.route.snapshot.paramMap.get('catalogId');
    this.catalogService.getCatalogById(this.catalogId).snapshotChanges().subscribe((res) => {
      this.catalogDetails = res.payload.data();
    })
  }

}
