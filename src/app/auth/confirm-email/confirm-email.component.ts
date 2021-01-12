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

@Component({
  selector: 'app-confirm-email',
  templateUrl: './confirm-email.component.html',
  styleUrls: ['./confirm-email.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfirmEmailComponent implements OnInit, OnDestroy {
  isLoading = false;
  isProcessing = false;
  isUserAlreadyConfirmed = false;
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

  ngOnInit(): void {
    this.userService.user$
      .pipe(takeUntil(this.isDestroyed$))
      .subscribe((user) => {
        this.isUserAlreadyConfirmed = user?.isConfirmed ?? false;

        this.token =
          this.activatedRoute.snapshot.paramMap.get('token') ?? undefined;

        return this.token === undefined
          ? undefined
          : this.verifyToken(this.token);
      })
      .unsubscribe();
  }

  ngOnDestroy(): void {
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
        switchMap((res) =>
          this.dialog.open(ConfirmEmailDialogComponent).afterClosed(),
        ),
        takeUntil(this.isDestroyed$),
      )
      .subscribe((afterClosed) => this.router.navigate(['/']));
  }

  private verifyToken(token: string): Subscription {
    this.isUserAlreadyConfirmed = false;
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
      .subscribe(
        (res) => {
          this.user = res.user;
          this.changeDetectorRef.detectChanges();
        },
        (err) => {
          if ((err as Error)?.message === 'email already confirmed') {
            this.isUserAlreadyConfirmed = true;
            this.changeDetectorRef.detectChanges();
          }
        },
      );
  }
}
