import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCreateProductFormComponent } from './admin-create-product-form.component';

describe('AdminCreateProductFormComponent', () => {
  let component: AdminCreateProductFormComponent;
  let fixture: ComponentFixture<AdminCreateProductFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminCreateProductFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminCreateProductFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create-product', () => {
    expect(component).toBeTruthy();
  });
});
