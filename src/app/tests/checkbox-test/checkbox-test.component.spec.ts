import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckboxTestComponent } from './checkbox-test.component';

describe('CheckboxTestComponent', () => {
  let component: CheckboxTestComponent;
  let fixture: ComponentFixture<CheckboxTestComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CheckboxTestComponent]
    });
    fixture = TestBed.createComponent(CheckboxTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
