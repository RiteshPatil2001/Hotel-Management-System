import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoyComponent } from './histoy.component';

describe('HistoyComponent', () => {
  let component: HistoyComponent;
  let fixture: ComponentFixture<HistoyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HistoyComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HistoyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
