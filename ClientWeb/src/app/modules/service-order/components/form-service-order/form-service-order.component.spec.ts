import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormServiceOrderComponent } from './form-service-order.component';

describe('FormServiceOrderComponent', () => {
  let component: FormServiceOrderComponent;
  let fixture: ComponentFixture<FormServiceOrderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FormServiceOrderComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormServiceOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
