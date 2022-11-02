import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MisRidesComponent } from './mis-rides.component';

describe('MisRidesComponent', () => {
  let component: MisRidesComponent;
  let fixture: ComponentFixture<MisRidesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MisRidesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MisRidesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
