import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookingdetailsmodalComponent } from './bookingdetailsmodal.component';

describe('BookingdetailsmodalComponent', () => {
  let component: BookingdetailsmodalComponent;
  let fixture: ComponentFixture<BookingdetailsmodalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookingdetailsmodalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BookingdetailsmodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
