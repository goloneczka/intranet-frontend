import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditDocumentGroupDialogComponent } from './edit-document-group-dialog.component';

describe('EditDocumentGroupDialogComponent', () => {
  let component: EditDocumentGroupDialogComponent;
  let fixture: ComponentFixture<EditDocumentGroupDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditDocumentGroupDialogComponent]
    });
    fixture = TestBed.createComponent(EditDocumentGroupDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
