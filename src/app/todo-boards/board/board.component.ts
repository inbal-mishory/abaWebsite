import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Board, Task } from 'src/app/models/board.model';
import { BoardService } from '../board.service';
import { BoardDialogComponent } from '../dialogs/board-dialog/board-dialog.component';
import { TaskDialogComponent } from '../dialogs/task-dialog/task-dialog.component';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {
  @Input() board: Board;
  constructor(private boardService: BoardService, private dialog: MatDialog) {}

  ngOnInit(): void {
  }

  taskDrop(event: CdkDragDrop<string>) {
    moveItemInArray(this.board.tasks, event.previousIndex, event.currentIndex);
    this.boardService.updateTasks(this.board.id, this.board.tasks)
  }

  updateBoardName(boardId: string, board: Board) {
    const dialogRef = this.dialog.open(BoardDialogComponent, {
      width: '500px',
      panelClass: 'task-modal',
      data: {...board,
            isEdit: true}
    });
    dialogRef.afterClosed().subscribe(data => {
      this.boardService.updateBoard(boardId, data).then().catch(err => console.log(err));
    })

  }

  updateTasks(task?: Task, idx?: number): void {
    const newTask = { description: '---', label: 'purple' };
    const dialogRef = this.dialog.open(TaskDialogComponent, {
      width: '500px',
      panelClass: 'task-modal',
      data: task ? { task: { ...task }, isNew: false, boardId: this.board.id, idx }
                 : { task: newTask, isNew: true }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (result.isNew) {
          const currentTasks: any = [...this.board.tasks, result.task];
          this.boardService.updateTasks(this.board.id, currentTasks).then()
                              .catch(err => console.log(err));
        } else {

          const tasks = this.board.tasks;
          tasks.splice(result.idx, 1, result.task);
          this.boardService.updateTasks(this.board.id, this.board.tasks).then()
                            .catch(err => console.log(err));

        }
      }
    });
  }

  deleteBoard() {
    this.boardService.deleteBoard(this.board.id);
  }

  deleteTask(task) {
    this.boardService.removeTask(this.board.id, task);
  }

}
