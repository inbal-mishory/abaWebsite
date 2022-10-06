import {Component, OnInit, Input, Output, EventEmitter, Inject} from '@angular/core';
import { CatalogService } from "../../../services/catalog.service";
import {Catalog} from "../../../models/catalog.model";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-edit-catalog',
  templateUrl: './edit-catalog.component.html',
  styleUrls: ['./edit-catalog.component.css'],
})
export class EditCatalogComponent implements OnInit {
  editCatalogForm: FormGroup = new FormGroup({});
  public catalog?: Catalog;
  submitted = false;
  @Output() refreshList: EventEmitter<any> = new EventEmitter();

  currentCatalog: Catalog = {
    title: '',
    description: '',
    published: false
  };
  message = '';

  constructor(private catalogService: CatalogService, public dialogRef: MatDialogRef<EditCatalogComponent>,
  @Inject(MAT_DIALOG_DATA) readonly item: any, private formBuilder: FormBuilder) {
    this.catalog = item;
  }

  ngOnInit(): void {
    this.message = '';
    this.initForm();
  }

  ngOnChanges(): void {
    this.message = '';
  }

  initForm() {
    if (this.item) {
      this.editCatalogForm = this.formBuilder.group({
        catalog_id: this.item.catalog_id ? this.item.catalog_id : '',
        title: [this.item.title ? this.item.title : '', [Validators.required]],
        // type: [this.item.type, [Validators.required]],
        description: [this.item.description ? this.item.description : '', [Validators.required]],
        imgUrl: [this.item.imgUrl? this.item.imgUrl : ''],
        artist: [this.item.artist ? this.item.artist : ''],
        gallery: [this.item.gallery ? this.item.gallery : '', [Validators.required]],
        language: this.item.language ? this.item.language : '',
        urlEnglish: this.item.urlEnglish ? this.item.urlEnglish : '',
        urlHeb: this.item.urlHeb ? this.item.urlHeb : '',
        year: this.item.year ? this.item.year : '',
        published: this.item.published ? this.item.published : false
      });
    }
  }

  updateCatalog(data?: any): void {
    const catalog = data.value;
    this.catalogService.update(catalog.catalog_id, {...catalog})
                        .then(() => {
                          console.log('done update?');
                          this.dialogRef.close({data: catalog });
                        })
                        .catch(err => console.log(err));

  }

  deleteCatalog(): void {
    if (this.currentCatalog.catalog_id) {
      this.catalogService.delete(this.currentCatalog.catalog_id)
        .then(() => {
          this.refreshList.emit();
          this.message = 'The catalog was updated successfully!';
        })
        .catch(err => console.log(err));
    }
  }

  saveItem(form: any): void {
    this.updateCatalog(form);
  }
}
