import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditDutyTypeComponent } from './edit-duty-type.component';

describe('EditDutyTypeComponent', () => {
  let component: EditDutyTypeComponent;
  let fixture: ComponentFixture<EditDutyTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditDutyTypeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditDutyTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
