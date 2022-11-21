import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-delete-button',
  templateUrl: './delete-button.component.html',
  styleUrls: ['./delete-button.component.css']
})
export class DeleteButtonComponent {
  canDelete: boolean;
  @Output() delete = new EventEmitter<boolean>();

  constructor() {
    this.canDelete = false;
  }

  prepareForDelete() {
    this.canDelete = true;
  }

  cancel () {
    this.canDelete = false;
  }

  deleteBoard() {
    this.delete.emit(true);
    this.canDelete = false;
  }

}
