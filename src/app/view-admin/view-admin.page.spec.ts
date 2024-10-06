import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ViewADMINPage } from './view-admin.page';

describe('ViewADMINPage', () => {
  let component: ViewADMINPage;
  let fixture: ComponentFixture<ViewADMINPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewADMINPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
