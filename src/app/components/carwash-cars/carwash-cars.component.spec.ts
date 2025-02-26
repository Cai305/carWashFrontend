import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarwashCarsComponent } from './carwash-cars.component';

describe('CarwashCarsComponent', () => {
  let component: CarwashCarsComponent;
  let fixture: ComponentFixture<CarwashCarsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CarwashCarsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CarwashCarsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
