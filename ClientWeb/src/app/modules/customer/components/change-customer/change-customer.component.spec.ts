import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeCustomerComponent } from './change-customer.component';

describe('ChangeCustomerComponent', () => {
  let component: ChangeCustomerComponent;
  let fixture: ComponentFixture<ChangeCustomerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChangeCustomerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangeCustomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
