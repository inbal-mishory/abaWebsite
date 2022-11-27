import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditChildArticleComponent } from './add-edit-child-article.component';

describe('AddEditChildArticleComponent', () => {
  let component: AddEditChildArticleComponent;
  let fixture: ComponentFixture<AddEditChildArticleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditChildArticleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEditChildArticleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
