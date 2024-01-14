import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayDailyPostComponent } from './display-daily-post.component';

describe('DisplayDailyPostComponent', () => {
  let component: DisplayDailyPostComponent;
  let fixture: ComponentFixture<DisplayDailyPostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DisplayDailyPostComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DisplayDailyPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
