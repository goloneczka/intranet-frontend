import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SortingContactsComponent } from './sorting-contacts.component';

describe('SortingContactsComponent', () => {
  let component: SortingContactsComponent;
  let fixture: ComponentFixture<SortingContactsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SortingContactsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SortingContactsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
