import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CatalogService} from "../../../services/catalog.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Catalog} from "../../../models/catalog.model";

@Component({
  selector: 'app-add-edit-catalog',
  templateUrl: './add-edit-catalog.component.html',
  styleUrls: ['./add-edit-catalog.component.css']
})
export class AddEditCatalogComponent implements OnInit {
  addEditCatalogForm?: FormGroup;
  message: string;
  isEdit?: boolean;
  constructor(private catalogService: CatalogService, public dialogRef: MatDialogRef<AddEditCatalogComponent>,
              @Inject(MAT_DIALOG_DATA) readonly data: any, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.isEdit = this.data.isEdit;
    this.initForm();
  }

  initForm() {
    // if (this.item) {
      this.addEditCatalogForm = this.formBuilder.group({
        catalog_id: this.data.details.catalog_id ? this.data.details.catalog_id : '',
        title: [this.isEdit ? this.data.details.title : '', [Validators.required]],
        description: [this.isEdit ? this.data.details.description : '', [Validators.required]],
        image: this.isEdit ? this.data.details.image : '',
        artist: [this.isEdit ? this.data.details.artist : '', [Validators.required]],
        gallery: this.isEdit ? this.data.details.gallery : '',
        language: this.isEdit ? this.data.details.language : '',
        urlEnglish: this.isEdit ? this.data.details.urlEnglish : '',
        urlHeb: this.isEdit ? this.data.details.urlHeb : '',
        year: this.isEdit ? this.data.details.year : '',
        moreInfo: this.isEdit ? this.data.details.moreInfo : '',
        published: this.isEdit ? this.data.details.published : false
      });
    // }
  }

  updateCatalog(): void {
    const catalog = this.addEditCatalogForm.getRawValue();
    this.catalogService.update(catalog.catalog_id, {...catalog}).then();
    this.dialogRef.close();
  }

  saveCat(catalog: Catalog): void {
    this.catalogService.create(catalog).then((res) => {
      this.dialogRef.close();
    });
  }
}
