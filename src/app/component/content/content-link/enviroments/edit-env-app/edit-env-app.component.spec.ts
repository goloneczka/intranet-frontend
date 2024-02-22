import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditEnvAppComponent } from './edit-env-app.component';

describe('EditEnvAppComponent', () => {
  let component: EditEnvAppComponent;
  let fixture: ComponentFixture<EditEnvAppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditEnvAppComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditEnvAppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
