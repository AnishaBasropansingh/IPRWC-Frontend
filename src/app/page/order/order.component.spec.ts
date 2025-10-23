import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderCompoment } from './order.component';

describe('OrderCompoment', () => {
  let component: OrderCompoment;
  let fixture: ComponentFixture<OrderCompoment>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrderCompoment]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrderCompoment);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
