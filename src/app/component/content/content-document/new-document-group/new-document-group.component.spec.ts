import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewDocumentGroupComponent } from './new-document-group.component';

describe('NewDocumentGroupComponent', () => {
  let component: NewDocumentGroupComponent;
  let fixture: ComponentFixture<NewDocumentGroupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NewDocumentGroupComponent]
    });
    fixture = TestBed.createComponent(NewDocumentGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
