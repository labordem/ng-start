import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, Subscription } from 'rxjs';
import { finalize, switchMap, takeUntil } from 'rxjs/operators';
import { User, UserService } from 'src/app/core/services/user.service';

import { AuthService } from '../auth.service';
import { ConfirmEmailDialogComponent } from '../confirm-email-dialog/confirm-email-dialog.component';

type EmailConfirmTemplate =
  | 'emailConfirmed'
  | 'emailNotConfirmed'
  | 'emailConfirmError'
  | 'loading';

@Component({
  selector: 'app-confirm-email',
  templateUrl: './confirm-email.component.html',
  styleUrls: ['./confirm-email.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfirmEmailComponent implements OnInit, OnDestroy {
  isLoading = false;
  isProcessing = false;
  template: EmailConfirmTemplate = 'loading';
  token: string | undefined = undefined;
  user: User | undefined = undefined;
  private readonly isDestroyed$ = new Subject<boolean>();

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly changeDetectorRef: ChangeDetectorRef,
    private readonly authService: AuthService,
    private readonly userService: UserService,
    private readonly dialog: MatDialog,
    private readonly router: Router,
  ) {}

  async ngOnInit(): Promise<Subscription | undefined> {
    this.token =
      this.activatedRoute.snapshot.paramMap.get('token') ?? undefined;

    return this.token === undefined ? undefined : this.verifyToken(this.token);
  }

  ngOnDestroy(): void {
    console.info(`💥 destroy: ${this.constructor.name}`);
    this.isDestroyed$.next(true);
    this.isDestroyed$.complete();
  }

  onRequestConfirmEmailToken(): Subscription {
    this.isProcessing = true;

    return this.userService.user$
      .pipe(
        switchMap((user) =>
          this.authService.requestConfirmEmailToken$(user as User),
        ),
        takeUntil(this.isDestroyed$),
      )
      .subscribe({
        next: async () => {
          const dialog = this.dialog.open(ConfirmEmailDialogComponent);
          await dialog.afterClosed().toPromise();
          this.router.navigate(['/']);
        },
      });
  }

  private verifyToken(token: string): Subscription {
    this.isLoading = true;

    return this.authService
      .verifyConfirmEmailToken$({ token })
      .pipe(
        finalize(() => {
          this.isLoading = false;
          this.changeDetectorRef.detectChanges();
        }),
        takeUntil(this.isDestroyed$),
      )
      .subscribe({
        next: (res) => {
          this.user = res.user;
          this.changeDetectorRef.detectChanges();
        },
        error: (err: Error) => {},
      });
  }
}
