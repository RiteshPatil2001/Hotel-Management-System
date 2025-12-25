import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckinmodalComponent } from './checkinmodal.component';

describe('CheckinmodalComponent', () => {
  let component: CheckinmodalComponent;
  let fixture: ComponentFixture<CheckinmodalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CheckinmodalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CheckinmodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
