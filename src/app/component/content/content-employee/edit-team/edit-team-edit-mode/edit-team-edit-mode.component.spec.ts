import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditTeamEditModeComponent } from './edit-team-edit-mode.component';

describe('EditTeamEditModeComponent', () => {
  let component: EditTeamEditModeComponent;
  let fixture: ComponentFixture<EditTeamEditModeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditTeamEditModeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditTeamEditModeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
