import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentEmployeeDepartmentComponent } from './content-employee-department.component';

describe('ContentEmployeeDepartmentComponent', () => {
  let component: ContentEmployeeDepartmentComponent;
  let fixture: ComponentFixture<ContentEmployeeDepartmentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ContentEmployeeDepartmentComponent]
    });
    fixture = TestBed.createComponent(ContentEmployeeDepartmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
