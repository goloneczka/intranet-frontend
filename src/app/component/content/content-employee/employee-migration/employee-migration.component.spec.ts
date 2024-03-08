import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeMigrationComponent } from './employee-migration.component';

describe('EmployeeMigrationComponent', () => {
  let component: EmployeeMigrationComponent;
  let fixture: ComponentFixture<EmployeeMigrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmployeeMigrationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EmployeeMigrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
