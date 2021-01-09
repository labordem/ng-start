import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { HttpJwtInterceptor } from './http-jwt.interceptor';

describe('HttpJwtInterceptor', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      providers: [HttpJwtInterceptor],
      imports: [RouterTestingModule],
    }),
  );

  it('should be created', () => {
    const interceptor: HttpJwtInterceptor = TestBed.inject(HttpJwtInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
