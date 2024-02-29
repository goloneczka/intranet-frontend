import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SortingDocumentComponent } from './sorting-document.component';

describe('SortingDialogComponent', () => {
  let component: SortingDocumentComponent;
  let fixture: ComponentFixture<SortingDocumentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SortingDocumentComponent]
    });
    fixture = TestBed.createComponent(SortingDocumentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
