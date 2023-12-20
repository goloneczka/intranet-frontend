import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentDutyComponent } from './content-duty.component';

describe('ContentDutyComponent', () => {
  let component: ContentDutyComponent;
  let fixture: ComponentFixture<ContentDutyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ContentDutyComponent]
    });
    fixture = TestBed.createComponent(ContentDutyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
