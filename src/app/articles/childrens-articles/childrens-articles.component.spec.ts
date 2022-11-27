import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChildrensArticlesComponent } from './childrens-articles.component';

describe('ChildrensArticlesComponent', () => {
  let component: ChildrensArticlesComponent;
  let fixture: ComponentFixture<ChildrensArticlesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChildrensArticlesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChildrensArticlesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
