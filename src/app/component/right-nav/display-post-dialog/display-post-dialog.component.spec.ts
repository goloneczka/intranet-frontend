import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayPostDialogComponent } from './display-post-dialog.component';

describe('DisplayPostDialogComponent', () => {
  let component: DisplayPostDialogComponent;
  let fixture: ComponentFixture<DisplayPostDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DisplayPostDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DisplayPostDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
