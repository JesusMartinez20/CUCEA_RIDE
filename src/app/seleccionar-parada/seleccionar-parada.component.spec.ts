import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeleccionarParadaComponent } from './seleccionar-parada.component';

describe('SeleccionarParadaComponent', () => {
  let component: SeleccionarParadaComponent;
  let fixture: ComponentFixture<SeleccionarParadaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SeleccionarParadaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SeleccionarParadaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
