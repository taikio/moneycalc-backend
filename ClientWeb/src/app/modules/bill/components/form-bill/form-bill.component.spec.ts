import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBillComponent } from './form-bill.component';

describe('FormBillComponent', () => {
  let component: FormBillComponent;
  let fixture: ComponentFixture<FormBillComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FormBillComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormBillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
