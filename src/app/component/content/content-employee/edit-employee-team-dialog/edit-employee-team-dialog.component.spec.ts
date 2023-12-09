import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditEmployeeTeamDialogComponent } from './edit-employee-team-dialog.component';

describe('EditEmployeeTeamDialogComponent', () => {
  let component: EditEmployeeTeamDialogComponent;
  let fixture: ComponentFixture<EditEmployeeTeamDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditEmployeeTeamDialogComponent]
    });
    fixture = TestBed.createComponent(EditEmployeeTeamDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
