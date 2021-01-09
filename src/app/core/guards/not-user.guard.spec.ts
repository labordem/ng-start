import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { NotUserGuard } from './not-user.guard';

describe('NotUserGuard', () => {
  let guard: NotUserGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
    });
    guard = TestBed.inject(NotUserGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
