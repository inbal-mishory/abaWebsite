import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditCritiqueComponent } from './addEdit-critique.component';

describe('AddCritiqueComponent', () => {
  let component: AddEditCritiqueComponent;
  let fixture: ComponentFixture<AddEditCritiqueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditCritiqueComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEditCritiqueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
