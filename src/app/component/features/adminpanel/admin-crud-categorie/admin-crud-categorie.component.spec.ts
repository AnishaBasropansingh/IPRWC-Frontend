import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCrudCategorieComponent } from './admin-crud-categorie.component';

describe('AdminCrudCategorieComponent', () => {
  let component: AdminCrudCategorieComponent;
  let fixture: ComponentFixture<AdminCrudCategorieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminCrudCategorieComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminCrudCategorieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
