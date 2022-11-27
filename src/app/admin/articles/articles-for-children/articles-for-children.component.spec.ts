import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticlesForChildrenComponent } from './articles-for-children.component';

describe('ArticlesForChildrenComponent', () => {
  let component: ArticlesForChildrenComponent;
  let fixture: ComponentFixture<ArticlesForChildrenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArticlesForChildrenComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArticlesForChildrenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
