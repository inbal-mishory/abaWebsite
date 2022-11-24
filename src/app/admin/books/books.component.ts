import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {IBook} from "../../models/book.model";
import {MatDialog} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MyBooksService} from "../../services/my-books.service";
import {map, tap} from "rxjs/operators";
import {AddEditBookComponent} from "./add-edit-book/add-edit-book.component";
import {ConfirmModalComponent} from "../../shared/modals/confirm.modal/confirm.modal.component";

@Component({
  selector: 'app-my-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit {
  books?:IBook[];
  constructor(private bookService: MyBooksService, private dialog: MatDialog, public cd: ChangeDetectorRef,
              private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.getBooks();
  }

  getBooks(): void {
    this.bookService.getAllBooks().snapshotChanges().pipe(
      map(changes =>
        changes.map(book =>
          ({ ...book.payload.doc.data(), id: book.payload.doc.id })
        ),
      ),
      tap(data => {
        data.sort((first:any, second:any) => 0 - (first.year > second.year ? -1 : 1));
      })
    ).subscribe((res) => this.books = res);
  }

  openEditBook(book: any) {
    const dialogRef = this.dialog.open(AddEditBookComponent, {
      width: '35vw',
      height: '45vh',
      data: {
        details: book,
        isEdit: true
      }
    });
    dialogRef.afterClosed().subscribe(() => {
      this.dialog.closeAll();
    })
  }

  openCreateBook() {
    const dialogRef = this.dialog.open(AddEditBookComponent, {
      width: '35vw',
      height: '45vh',
      data: {
        details: '',
        isEdit: false
      }
    });
    dialogRef.afterClosed().subscribe(() => {
      this.getBooks();
    })
  }

  deleteDialog(id: string, title: string) {
    const data = {
      id: id,
      title
    }
    const dialogRef = this.dialog.open(ConfirmModalComponent, {
      width: '25vw',
      height: '25vh',
      data
    } );

    dialogRef.afterClosed().subscribe((res) => {
      if (res) {
        this.deleteBook(id);
      } else {
        console.log('something went wrong')
      }
    });
  }

  deleteBook(bookId: string) {
    this.bookService.delete(bookId).then((res) => {
      this.openSnackBar();
    }).catch((err) => {
      console.log(err);
    });
  }

  openSnackBar(): void {
    this._snackBar.open('Book deleted successfully', 'close', {
      horizontalPosition: "center",
      verticalPosition: "top",
    });
  }
}
