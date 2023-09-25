import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentDocumentComponent } from './content-document.component';

describe('ContentDocumentComponent', () => {
  let component: ContentDocumentComponent;
  let fixture: ComponentFixture<ContentDocumentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ContentDocumentComponent]
    });
    fixture = TestBed.createComponent(ContentDocumentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
