import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RightNavParentComponent } from './right-nav-parent.component';

describe('RightNavParentComponent', () => {
  let component: RightNavParentComponent;
  let fixture: ComponentFixture<RightNavParentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RightNavParentComponent]
    });
    fixture = TestBed.createComponent(RightNavParentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
