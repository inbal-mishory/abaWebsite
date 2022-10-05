import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CritiqueListComponent } from './critique-list.component';

describe('CritiqueComponent', () => {
  let component: CritiqueListComponent;
  let fixture: ComponentFixture<CritiqueListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CritiqueListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CritiqueListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
