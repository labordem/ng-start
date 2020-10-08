import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutUserButtonComponent } from './layout-user-button.component';

describe('LayoutUserButtonComponent', () => {
  let component: LayoutUserButtonComponent;
  let fixture: ComponentFixture<LayoutUserButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LayoutUserButtonComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LayoutUserButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
