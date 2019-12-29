import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeServiceOrderComponent } from './change-service-order.component';

describe('ChangeServiceOrderComponent', () => {
  let component: ChangeServiceOrderComponent;
  let fixture: ComponentFixture<ChangeServiceOrderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChangeServiceOrderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangeServiceOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
