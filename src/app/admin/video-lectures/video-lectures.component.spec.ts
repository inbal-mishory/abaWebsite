import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoLecturesComponent } from './video-lectures.component';

describe('VideoLecturesComponent', () => {
  let component: VideoLecturesComponent;
  let fixture: ComponentFixture<VideoLecturesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VideoLecturesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VideoLecturesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
