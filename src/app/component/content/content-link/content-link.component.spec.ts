import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentLinkComponent } from './content-link.component';

describe('ContentLinkComponent', () => {
  let component: ContentLinkComponent;
  let fixture: ComponentFixture<ContentLinkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContentLinkComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ContentLinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
