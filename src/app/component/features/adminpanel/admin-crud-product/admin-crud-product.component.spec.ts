import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCrudProductComponent } from './admin-crud-product.component';

describe('AdminCrudProductComponent', () => {
  let component: AdminCrudProductComponent;
  let fixture: ComponentFixture<AdminCrudProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminCrudProductComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminCrudProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create-product', () => {
    expect(component).toBeTruthy();
  });
});
