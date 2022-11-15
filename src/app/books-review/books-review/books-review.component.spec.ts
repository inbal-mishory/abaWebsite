import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BooksReviewComponent } from './books-review.component';

describe('BooksReviewComponent', () => {
  let component: BooksReviewComponent;
  let fixture: ComponentFixture<BooksReviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BooksReviewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BooksReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
