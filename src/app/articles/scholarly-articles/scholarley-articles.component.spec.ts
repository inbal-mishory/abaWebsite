import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScholarleyArticlesComponent } from './scholarly-articles.component';

describe('ScholarleyArticlesComponent', () => {
  let component: ScholarleyArticlesComponent;
  let fixture: ComponentFixture<ScholarleyArticlesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScholarleyArticlesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ScholarleyArticlesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
