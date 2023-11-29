import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewEmployeeTeamComponent } from './new-employee-team.component';

describe('NewEmployeeTeamComponent', () => {
  let component: NewEmployeeTeamComponent;
  let fixture: ComponentFixture<NewEmployeeTeamComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NewEmployeeTeamComponent]
    });
    fixture = TestBed.createComponent(NewEmployeeTeamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
