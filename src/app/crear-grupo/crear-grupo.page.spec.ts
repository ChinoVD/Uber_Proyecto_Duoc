import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CrearGrupoPage } from './crear-grupo.page';

describe('CrearGrupoPage', () => {
  let component: CrearGrupoPage;
  let fixture: ComponentFixture<CrearGrupoPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CrearGrupoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
