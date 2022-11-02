import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MicarroComponent } from './micarro.component';

describe('MicarroComponent', () => {
  let component: MicarroComponent;
  let fixture: ComponentFixture<MicarroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MicarroComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MicarroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
