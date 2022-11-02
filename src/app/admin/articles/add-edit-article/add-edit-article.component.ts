import {Component, EventEmitter, Inject, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {ArticlesService} from "../../../services/articles.service";
import {IArticle} from "../../../models/article.model";

@Component({
  selector: 'app-add-edit-article',
  templateUrl: './add-edit-article.component.html',
  styleUrls: ['./add-edit-article.component.css']
})
export class AddEditArticleComponent implements OnInit {
  editArticleForm: FormGroup;
  isEdit?: boolean;
  @Output() refreshList: EventEmitter<any> = new EventEmitter();
  message = '';
  constructor(private formBuilder: FormBuilder, @Inject(MAT_DIALOG_DATA) readonly data,
              public dialogRef: MatDialogRef<AddEditArticleComponent>, private articleService: ArticlesService) { }

  ngOnInit(): void {
    this.isEdit = this.data.isEdit;
    this.initForm();
  }

  initForm(): void {
    if (this.data) {
      console.log(this.data);
      this.editArticleForm = this.formBuilder.group({
        title: [this.data.details.title ? this.data.details.title : '', [Validators.required]],
        id: this.data.details.id ? this.data.details.id : '',
        publication: [this.data.details.publication ? this.data.details.publication : '', [Validators.required]],
        date: this.data.details.date ? this.data.details.date : '',
        link: this.data.details.link ? this.data.details.link : '',
      });
    }
  }

  updateBook() {
    const article = this.editArticleForm?.getRawValue();
    this.articleService.updateArticle(article.id, article).then(() => {
      console.log('done update?');
      this.dialogRef.close({data: article });
    })
      .catch(err => console.log(err));
  }

  createArticle(value: IArticle) {
    this.articleService.createArticle(value).then(() => {
      this.dialogRef.close({data: value});
    });
  }
}
