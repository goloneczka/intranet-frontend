import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewDutyDialogComponent } from './new-duty-dialog.component';

describe('NewDutyDialogComponent', () => {
  let component: NewDutyDialogComponent;
  let fixture: ComponentFixture<NewDutyDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NewDutyDialogComponent]
    });
    fixture = TestBed.createComponent(NewDutyDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
