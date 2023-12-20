import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DailDutyListComponent } from './dail-duty-list.component';

describe('DailDutyListComponent', () => {
  let component: DailDutyListComponent;
  let fixture: ComponentFixture<DailDutyListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DailDutyListComponent]
    });
    fixture = TestBed.createComponent(DailDutyListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
