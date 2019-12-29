import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeBillComponent } from './change-bill.component';

describe('ChangeBillComponent', () => {
  let component: ChangeBillComponent;
  let fixture: ComponentFixture<ChangeBillComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChangeBillComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangeBillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
