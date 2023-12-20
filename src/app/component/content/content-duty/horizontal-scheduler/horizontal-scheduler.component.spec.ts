import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HorizontalSchedulerComponent } from './horizontal-scheduler.component';

describe('HorizontalSchedulerComponent', () => {
  let component: HorizontalSchedulerComponent;
  let fixture: ComponentFixture<HorizontalSchedulerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HorizontalSchedulerComponent]
    });
    fixture = TestBed.createComponent(HorizontalSchedulerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
