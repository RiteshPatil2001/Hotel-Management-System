import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckoutmodalComponent } from './checkoutmodal.component';

describe('CheckoutmodalComponent', () => {
  let component: CheckoutmodalComponent;
  let fixture: ComponentFixture<CheckoutmodalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CheckoutmodalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CheckoutmodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
