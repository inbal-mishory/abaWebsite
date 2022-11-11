import { Injectable } from '@angular/core';
import firebase from 'firebase/compat/app';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { switchMap } from 'rxjs';
import { Board, Task } from '../models/board.model';

@Injectable({
  providedIn: 'root'
})
export class BoardService {
  private boardsRef = this.db.collection('boards');
  constructor(private afAuth: AngularFireAuth, private db: AngularFirestore ) { }

  /*
    Creates a new board for current user
  */
  async createBoard(data: Board) {
    const user = await this.afAuth.currentUser;
    return this.boardsRef.add({
      ...data,
      uid: user.uid,
      tasks: [{ description: 'insert text', label: 'gray' }]
    });
  }

  /*
    Updates the board name
  */
    updateBoard(boardId: string, data: Board): Promise<void> {
      return this.boardsRef.doc(boardId).update(data);
    }

  /**
   * Delete board
   */
   deleteBoard(boardId: string) {
    this.boardsRef
      .doc(boardId)
      .delete()
      .catch((err) => console.log(err));
  }

  /**
   * Updates the tasks on board
   */
  updateTasks(boardId: string, tasks: Task[]): Promise<void> {
    return this.boardsRef
      .doc(boardId)
      .update({ tasks });
  }

  /**
   * Remove a specifc task from the board
   */
   removeTask(boardId: string, task: Task) {
    return this.db
      .collection('boards')
      .doc(boardId)
      .update({
        tasks: firebase.firestore.FieldValue.arrayRemove(task)
      });
  }

  /*
    Get all boards owned by current user
  */
  getUserBoards() {
    return this.afAuth.authState.pipe(
      switchMap (user => {
        if (user) {
          return this.db.collection<Board>('boards', ref =>
            ref.where('uid', '==', user.uid).orderBy('priority')
            )
            .valueChanges({idField: 'id'});

        } else {
          return [];
        }
      })
    );
  }

  /**
   * Run a batch write to change the priority of each board for sorting
   */
   sortBoards(boards: Board[]) {
    const db = firebase.firestore();
    const batch = db.batch();
    const refs = boards.map(b => db.collection('boards').doc(b.id));
    refs.forEach((ref, idx) => batch.update(ref, { priority: idx }));
    batch.commit();
  }
}
