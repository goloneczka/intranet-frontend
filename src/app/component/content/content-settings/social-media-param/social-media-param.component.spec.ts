import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SocialMediaParamComponent } from './social-media-param.component';

describe('SocialMediaParamComponent', () => {
  let component: SocialMediaParamComponent;
  let fixture: ComponentFixture<SocialMediaParamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SocialMediaParamComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SocialMediaParamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
