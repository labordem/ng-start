import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { ConfirmedUserGuard } from './confirmed-user.guard';

describe('ConfirmedUserGuard', () => {
  let guard: ConfirmedUserGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
    });
    guard = TestBed.inject(ConfirmedUserGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
