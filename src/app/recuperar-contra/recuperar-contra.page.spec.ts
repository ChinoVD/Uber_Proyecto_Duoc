import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RecuperarContraPage } from './recuperar-contra.page';

describe('RecuperarContraPage', () => {
  let component: RecuperarContraPage;
  let fixture: ComponentFixture<RecuperarContraPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(RecuperarContraPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
