import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentHomeComponent } from './content-home.component';

describe('ContentHomeComponent', () => {
  let component: ContentHomeComponent;
  let fixture: ComponentFixture<ContentHomeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ContentHomeComponent]
    });
    fixture = TestBed.createComponent(ContentHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
