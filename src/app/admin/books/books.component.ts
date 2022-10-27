import {ChangeDetectorRef, Component, Inject, OnInit} from '@angular/core';
import {IBook} from "../../models/book.model";
import {Observable} from "rxjs";
import {MatDialog} from "@angular/material/dialog";
import {FileUploadService} from "../../services/file-upload.service";
import {HttpClient} from "@angular/common/http";
import {AngularFireDatabase} from "@angular/fire/compat/database";
import {MatSnackBar} from "@angular/material/snack-bar";
import {AngularFirestore, AngularFirestoreCollection} from "@angular/fire/compat/firestore";
import {BooksService} from "../../services/books.service";
import {map, tap} from "rxjs/operators";
import {AddEditBookComponent} from "./add-edit-book/add-edit-book.component";
import {ConfirmModalComponent} from "../../shared/modals/confirm.modal/confirm.modal.component";

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit {
  books?:IBook[];
  books$?: AngularFirestoreCollection<IBook>;
  constructor(private bookService: BooksService, private dialog: MatDialog, public uploadService: FileUploadService,
              private http: HttpClient, @Inject(AngularFireDatabase) private firebase: AngularFireDatabase,
              public cd: ChangeDetectorRef, private _snackBar: MatSnackBar, public afs: AngularFirestore) { }

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
      height: '50vh',
      data: {
        details: book,
        isEdit: true
      }
    });
    dialogRef.afterClosed().subscribe(() => {
      this.getBooks();
    })
  }

  openCreateBook() {
    const dialogRef = this.dialog.open(AddEditBookComponent, {
      width: '35vw',
      height: '50vh',
      data: {
        details: '',
        isEdit: false
      }
    });
    dialogRef.afterClosed().subscribe(() => {
      this.getBooks();
    })
  }

  deleteDialog(id: string) {
    const data = {
      id: id,
      name: 'Delete Book'
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
