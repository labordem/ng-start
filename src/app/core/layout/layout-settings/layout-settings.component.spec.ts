import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule } from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';
import { RouterTestingModule } from '@angular/router/testing';

import { LayoutSettingsComponent } from './layout-settings.component';

describe('LayoutSettingsComponent', () => {
  let component: LayoutSettingsComponent;
  let fixture: ComponentFixture<LayoutSettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LayoutSettingsComponent],
      imports: [RouterTestingModule, MatDialogModule, MatMenuModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LayoutSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
