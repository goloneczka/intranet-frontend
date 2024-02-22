import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewEnvAppComponent } from './new-env-app.component';

describe('NewEnvComponent', () => {
  let component: NewEnvAppComponent;
  let fixture: ComponentFixture<NewEnvAppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewEnvAppComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NewEnvAppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
