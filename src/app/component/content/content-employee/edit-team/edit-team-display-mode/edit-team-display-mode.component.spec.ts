import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditTeamDisplayModeComponent } from './edit-team-display-mode.component';

describe('EditTeamDisplayModeComponent', () => {
  let component: EditTeamDisplayModeComponent;
  let fixture: ComponentFixture<EditTeamDisplayModeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditTeamDisplayModeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditTeamDisplayModeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
