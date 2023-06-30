import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JourneyFormComponent } from './journey-form.component';

describe('JourneyFormComponent', () => {
  let component: JourneyFormComponent;
  let fixture: ComponentFixture<JourneyFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [JourneyFormComponent]
    });
    fixture = TestBed.createComponent(JourneyFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
