import { Component, OnInit } from '@angular/core';
import {FormGroup} from "@angular/forms";

@Component({
  selector: 'app-add-edit-catalog',
  templateUrl: './add-edit-catalog.component.html',
  styleUrls: ['./add-edit-catalog.component.css']
})
export class AddEditCatalogComponent implements OnInit {
  addCatalogForm?: FormGroup;
  constructor() { }

  ngOnInit(): void {
  }

}
