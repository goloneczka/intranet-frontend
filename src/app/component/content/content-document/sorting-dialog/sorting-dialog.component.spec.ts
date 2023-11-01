import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SortingDialogComponent } from './sorting-dialog.component';

describe('SortingDialogComponent', () => {
  let component: SortingDialogComponent;
  let fixture: ComponentFixture<SortingDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SortingDialogComponent]
    });
    fixture = TestBed.createComponent(SortingDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});