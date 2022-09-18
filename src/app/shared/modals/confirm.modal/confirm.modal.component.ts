import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-confirm.modal',
  templateUrl: './confirm.modal.component.html',
  styleUrls: ['./confirm.modal.component.css']
})
export class ConfirmModalComponent {
  public componentName: string;
  private catalogId: string;

  constructor(@Inject(MAT_DIALOG_DATA) readonly data: any, public dialogRef: MatDialogRef<any>, ) {
    this.catalogId = data.catalog_id;
    this.componentName = data.name;
  }


}
