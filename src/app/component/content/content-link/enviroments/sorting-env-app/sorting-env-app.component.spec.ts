import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SortingEnvAppComponent } from './sorting-env-app.component';

describe('SortingEnvAppComponent', () => {
  let component: SortingEnvAppComponent;
  let fixture: ComponentFixture<SortingEnvAppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SortingEnvAppComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SortingEnvAppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
