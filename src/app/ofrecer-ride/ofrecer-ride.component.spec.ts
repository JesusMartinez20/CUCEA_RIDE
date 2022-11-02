import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OfrecerRideComponent } from './ofrecer-ride.component';

describe('OfrecerRideComponent', () => {
  let component: OfrecerRideComponent;
  let fixture: ComponentFixture<OfrecerRideComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OfrecerRideComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OfrecerRideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
