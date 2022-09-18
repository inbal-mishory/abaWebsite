import {Component, EventEmitter, Inject, OnInit, Output} from '@angular/core';
import { Catalog } from '../../models/catalog.model';
import {CatalogService} from "../../services/catalog.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {AngularFireStorage} from "@angular/fire/compat/storage";
import {FileUploadService} from "../../services/file-upload.service";
import firebase from "firebase/compat";
import {FileUpload} from "../../models/file.model";

@Component({
  selector: 'app-add-catalog',
  templateUrl: './add-catalog.component.html',
  styleUrls: ['./add-catalog.component.css']
})
export class AddCatalogComponent implements OnInit {
  @Output() fileUrl?: EventEmitter<string>;
  addCatalogForm?: FormGroup;
  catalog: Catalog = new Catalog();
  submitted = false;
  file: any;
  imgSrc?: string;
  selectedImage?: any;
  private currentFileUpload?: FileUpload;
  selectedFiles?: FileList;
  public percentage?: number;
  catalogsList?: Catalog[];

  constructor(private formBuilder: FormBuilder, private catalogService: CatalogService, public dialogRef: MatDialogRef<AddCatalogComponent>,
              @Inject(MAT_DIALOG_DATA) readonly data: any, public storage: AngularFireStorage, public fileUploadService: FileUploadService) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.addCatalogForm = this.formBuilder.group({
      title : ['', [Validators.required]],
      description: ['', [Validators.required]],
      imgUrl: '',
      artist: ['', [Validators.required]],
      gallery: ['', [Validators.required]],
      language: '',
      urlEnglish: '',
      urlHeb: '',
      year: null,
      published: false
    });
  }

  detectFiles(event: any) {
    this.selectedImage = event.target.files[0];
  }

  showPreview(event: any) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e: any) => this.imgSrc = e.target.result;
      reader.readAsDataURL(event.target.files[0]);
      this.selectedFiles = event.target.files;
    }
    else {
      this.imgSrc = '/assets/img/image_placeholder.jpg';
      this.selectedImage = null;
    }
  }

  saveCatalog(catalog: Catalog): void {
    this.catalog = {...this.addCatalogForm?.value};
    this.catalogService.createCatalogDetails(catalog).subscribe((cat: any) => console.log(cat));
    console.log('back rom create', this.catalogsList);
    this.dialogRef.close({data: this.catalogsList});
  }

  saveCat(catalog: Catalog): void {
    // @ts-ignore
    this.catalogService.create(catalog).then((res) => {
      this.dialogRef.close({data: this.catalogsList, newId: res.id})
      this.submitted = true;
    });
  }

  newCat(): void {
    this.submitted = false;
    this.catalog = new Catalog();
  }

  upload(): void {
    if (this.selectedFiles) {
      const file: File | null = this.selectedFiles.item(0);
      this.selectedFiles = undefined;

      if (file) {
        this.currentFileUpload = new FileUpload(file);
        this.fileUploadService.saveFileData(this.currentFileUpload);
        // this.fileUploadService.pushFileToStorage(this.currentFileUpload).subscribe(
        //   percentage => {
        //     this.percentage = Math.round(percentage ? percentage : 0);
        //   },
        //   error => {
        //     console.log(error);
        //   }
        // );
      }
    }
  }
}
