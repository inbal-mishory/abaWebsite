import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {ArticlesService} from "../../../../services/articles.service";
import {IArticle, IChildArticle} from "../../../../models/article.model";

@Component({
  selector: 'app-add-edit-child-article',
  templateUrl: './add-edit-child-article.component.html',
  styleUrls: ['./add-edit-child-article.component.css']
})
export class AddEditChildArticleComponent implements OnInit {
  editArticleForm: FormGroup;
  isEdit?: boolean;
  message = '';
  constructor(private formBuilder: FormBuilder, @Inject(MAT_DIALOG_DATA) readonly data,
              public dialogRef: MatDialogRef<AddEditChildArticleComponent>, private articleService: ArticlesService) { }

  ngOnInit(): void {
    this.isEdit = this.data.isEdit;
    this.initForm();
  }

  initForm(): void {
    this.editArticleForm = this.formBuilder.group({
      title: [this.data?.details?.title ? this.data.details.title : '', [Validators.required]],
      id: this.data?.details?.id ? this.data.details.id : '',
      magazine: [this.data?.details?.magazine ? this.data.details.magazine : '', [Validators.required]],
      year: this.data?.details?.year ? this.data.details.year : '',
      link: this.data?.details?.link ? this.data.details.link : '',
    });
  }

  updateArticle() {
    const article = this.editArticleForm?.getRawValue();
    this.articleService.updateChildArticle(article.id, article)
                        .then(() => {
                          this.dialogRef.close({data: article });
                        })
                        .catch(err => console.log(err));
    // this.dialogRef.close();
  }

  createArticle(value: IChildArticle) {
    this.articleService.createChildArticle(value).then(() => {
      this.dialogRef.close({data: value});
    });
  }

  close() {
    this.dialogRef.close();
  }

}
