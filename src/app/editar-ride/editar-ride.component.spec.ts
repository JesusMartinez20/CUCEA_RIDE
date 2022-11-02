import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarRideComponent } from './editar-ride.component';

describe('EditarRideComponent', () => {
  let component: EditarRideComponent;
  let fixture: ComponentFixture<EditarRideComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditarRideComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarRideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
