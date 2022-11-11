import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-board-dialog',
  templateUrl: './board-dialog.component.html',
  styleUrls: ['./board-dialog.component.css']
})
export class BoardDialogComponent implements OnInit {
  isEdit = false;
  constructor( public dialogRef: MatDialogRef<BoardDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
    this.isEdit = this.data.isEdit;
  }

}
