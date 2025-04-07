import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatTripComponent } from './updat-trip.component';

describe('UpdatTripComponent', () => {
  let component: UpdatTripComponent;
  let fixture: ComponentFixture<UpdatTripComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdatTripComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdatTripComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
