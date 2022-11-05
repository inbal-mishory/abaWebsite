import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TodoBoardsRoutingModule } from './todo-boards-routing.module';
import { MaterialModule } from 'src/app/shared/material.module';
import { FormsModule } from '@angular/forms';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { BoardsListComponent } from './boards-list/boards-list.component';
import { BoardComponent } from './board/board.component';
import { BoardDialogComponent } from './dialogs/board-dialog/board-dialog.component';
import { TaskDialogComponent } from './dialogs/task-dialog/task-dialog.component'
import { DeleteButtonComponent } from '../shared/delete-button/delete-button.component';


@NgModule({
  declarations: [
    BoardsListComponent,
    BoardComponent,
    BoardDialogComponent,
    TaskDialogComponent,
    DeleteButtonComponent
  ],
  imports: [
    CommonModule,
    TodoBoardsRoutingModule,
    MaterialModule,
    FormsModule,
    DragDropModule
  ]
})
export class TodoBoardsModule { }
