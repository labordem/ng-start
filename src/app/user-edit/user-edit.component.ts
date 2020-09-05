import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { from, Observable, Subject, Subscription } from 'rxjs';
import { map, mergeMap, take, takeUntil } from 'rxjs/operators';

import { User, UserService } from '../core/user.service';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserEditComponent implements OnDestroy {
  formGroup: FormGroup;
  errorMessage = '';
  user$: Observable<User | undefined>;
  private readonly isDestroyed$ = new Subject<boolean>();

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly userService: UserService
  ) {
    this.user$ = this.userService.user$;
    this.formGroup = this.formBuilder.group({
      // tslint:disable-next-line: no-null-keyword
      description: [null, [Validators.maxLength(190)]],
    });
  }

  get description(): AbstractControl | null {
    return this.formGroup.get('description');
  }

  onImportImage($event: Event | DataTransfer): Subscription {
    return from(this.getFileFromEvent($event))
      .pipe(
        mergeMap((avatar) =>
          this.userService.user$.pipe(map((user) => ({ user, avatar })))
        ),
        take(1),
        takeUntil(this.isDestroyed$)
      )
      .subscribe({
        next: ({ user, avatar }) =>
          this.userService.update({ ...(user as User), avatar }),
      });
  }

  ngOnDestroy(): void {
    console.info(`💥 destroyed: ${this.constructor.name}`);
    this.isDestroyed$.next(true);
    this.isDestroyed$.complete();
  }

  private getFileFromEvent($event: Event | DataTransfer): Promise<string> {
    const event = $event as Event;
    event.preventDefault();
    const target = event.target as HTMLInputElement;
    const file = (target?.files ?? ($event as DataTransfer)?.files)[0];

    return new Promise((res, rej) => {
      const reader = new FileReader();
      reader.onload = (e) => res(e?.target?.result as string);
      reader.onerror = rej;
      reader.readAsDataURL(file);
    });
  }
}
