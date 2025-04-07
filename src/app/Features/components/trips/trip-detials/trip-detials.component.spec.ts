import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TripDetialsComponent } from './trip-detials.component';

describe('TripDetialsComponent', () => {
  let component: TripDetialsComponent;
  let fixture: ComponentFixture<TripDetialsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TripDetialsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TripDetialsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
