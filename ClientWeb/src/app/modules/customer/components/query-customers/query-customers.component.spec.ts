import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QueryCustomersComponent } from './query-customers.component';

describe('QueryCustomersComponent', () => {
  let component: QueryCustomersComponent;
  let fixture: ComponentFixture<QueryCustomersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QueryCustomersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QueryCustomersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
