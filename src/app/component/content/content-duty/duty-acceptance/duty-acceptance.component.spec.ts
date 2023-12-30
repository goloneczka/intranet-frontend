import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DutyAcceptanceComponent } from './duty-acceptance.component';

describe('DutyAcceptanceComponent', () => {
  let component: DutyAcceptanceComponent;
  let fixture: ComponentFixture<DutyAcceptanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DutyAcceptanceComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DutyAcceptanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
