import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroCarroComponent } from './registro-carro.component';

describe('RegistroCarroComponent', () => {
  let component: RegistroCarroComponent;
  let fixture: ComponentFixture<RegistroCarroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegistroCarroComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistroCarroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
