import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEdditVideoComponent } from './add-eddit-video.component';

describe('AddEdditVideoComponent', () => {
  let component: AddEdditVideoComponent;
  let fixture: ComponentFixture<AddEdditVideoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEdditVideoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEdditVideoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
