import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ICritique, Critique} from "../../../models/critique.model";
import {CritiqueService} from "../../../services/critique.service";

@Component({
  selector: 'app-addEdit-critique',
  templateUrl: './addEdit-critique.component.html',
  styleUrls: ['./addEdit-critique.component.css']
})
export class AddEditCritiqueComponent implements OnInit {
  addCritiqueForm?: FormGroup;
  critique?: ICritique;
  critiqueId?: string | undefined;
  isEdit?: boolean;
  critiqueList?: Critique[];
  constructor(private formBuilder: FormBuilder, @Inject(MAT_DIALOG_DATA) readonly data: any,
              public dialogRef: MatDialogRef<AddEditCritiqueComponent>, private critiqueService: CritiqueService) { }

  ngOnInit(): void {
    this.isEdit = this.data.isEdit;
    this.critiqueId = this.data.details ? this.data.details.id : null;
    this.initForm();
  }

  initForm() {
    this.addCritiqueForm = this.formBuilder.group({
      title: [this.data?.details?.title ? this.data.details.title : '', [Validators.required]],
      curator: [this.data?.details?.curator ? this.data.details.curator : '', [Validators.required]],
      artist: this.data?.details?.artist ? this.data.details.artist : '',
      gallery: [this.data?.details?.gallery ? this.data.details.gallery : '', [Validators.required]],
      museum: this.data?.details?.museum ? this.data.details.museum : '',
      paper: this.data?.details?.paper ? this.data.details.paper : '',
      article: this.data?.details?.article ? this.data.details.article : '',
      date: this.data?.details?.date ? this.data.details.date : '',
      id: this.data?.details ? this.data.details.id : ''
    });
  }

  saveCritique(critique: any): void {
      this.critiqueService.createCritique(critique).then((res) => {
        this.dialogRef.close({data: this.critiqueList, id: res.id})
      });
  }

  updateCritique(critique: any) {
    this.critiqueService.updateCritique(critique.id, critique).then(() => {
        console.log('done update?');
        this.dialogRef.close({data: critique });
      })
      .catch(err => console.log(err));
  }
}
