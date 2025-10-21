import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminUpdateProductFormComponent } from './admin-update-product-form.component';

describe('AdminUpdateProductFormComponent', () => {
  let component: AdminUpdateProductFormComponent;
  let fixture: ComponentFixture<AdminUpdateProductFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminUpdateProductFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminUpdateProductFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create-product', () => {
    expect(component).toBeTruthy();
  });
});
