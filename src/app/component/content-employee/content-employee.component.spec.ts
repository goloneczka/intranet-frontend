import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentEmployeeComponent } from './content-employee.component';

describe('ContentEmployeeComponent', () => {
  let component: ContentEmployeeComponent;
  let fixture: ComponentFixture<ContentEmployeeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ContentEmployeeComponent]
    });
    fixture = TestBed.createComponent(ContentEmployeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
