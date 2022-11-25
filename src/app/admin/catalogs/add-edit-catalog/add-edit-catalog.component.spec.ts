import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditCatalogComponent } from './add-edit-catalog.component';

describe('AddEditCatalogComponent', () => {
  let component: AddEditCatalogComponent;
  let fixture: ComponentFixture<AddEditCatalogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditCatalogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEditCatalogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
