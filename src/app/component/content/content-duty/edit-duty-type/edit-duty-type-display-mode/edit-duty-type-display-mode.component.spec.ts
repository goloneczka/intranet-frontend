import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditDutyTypeDisplayModeComponent } from './edit-duty-type-display-mode.component';

describe('EditDutyTypeDisplayModeComponent', () => {
  let component: EditDutyTypeDisplayModeComponent;
  let fixture: ComponentFixture<EditDutyTypeDisplayModeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditDutyTypeDisplayModeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditDutyTypeDisplayModeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
