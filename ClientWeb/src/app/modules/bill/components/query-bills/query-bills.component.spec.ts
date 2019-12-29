import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QueryBillsComponent } from './query-bills.component';

describe('QueryBillsComponent', () => {
  let component: QueryBillsComponent;
  let fixture: ComponentFixture<QueryBillsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QueryBillsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QueryBillsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
