import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarwashDashboardComponent } from './carwash-dashboard.component';

describe('CarwashDashboardComponent', () => {
  let component: CarwashDashboardComponent;
  let fixture: ComponentFixture<CarwashDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CarwashDashboardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CarwashDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
