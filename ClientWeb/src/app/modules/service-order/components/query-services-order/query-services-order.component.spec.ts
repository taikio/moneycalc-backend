import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QueryServicesOrderComponent } from './query-services-order.component';

describe('QueryServicesOrderComponent', () => {
  let component: QueryServicesOrderComponent;
  let fixture: ComponentFixture<QueryServicesOrderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QueryServicesOrderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QueryServicesOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
