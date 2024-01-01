import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditDutyTypeEditModeComponent } from './edit-duty-type-edit-mode.component';

describe('EditDutyTypeEditModeComponent', () => {
  let component: EditDutyTypeEditModeComponent;
  let fixture: ComponentFixture<EditDutyTypeEditModeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditDutyTypeEditModeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditDutyTypeEditModeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
