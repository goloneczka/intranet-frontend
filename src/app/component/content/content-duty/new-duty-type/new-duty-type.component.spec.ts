import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewDutyTypeComponent } from './new-duty-type.component';

describe('NewDutyTypeComponent', () => {
  let component: NewDutyTypeComponent;
  let fixture: ComponentFixture<NewDutyTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewDutyTypeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NewDutyTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
