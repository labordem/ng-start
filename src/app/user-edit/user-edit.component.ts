import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Observable, Subject } from 'rxjs';

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
  user$: Observable<User>;
  private readonly isDestroyed$ = new Subject<boolean>();

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly userService: UserService
  ) {
    this.user$ = this.userService.getUser$();
    this.formGroup = this.formBuilder.group({
      // tslint:disable-next-line: no-null-keyword
      description: [null, [Validators.maxLength(190)]],
    });
  }

  get description(): AbstractControl | null {
    return this.formGroup.get('description');
  }

  async onImportImage($event: Event | DataTransfer): Promise<void> {
    const avatar = await this.getFileFromEvent($event);
    this.userService.setUser({
      ...this.userService.getUserFromStorage(),
      avatar,
    });
  }

  ngOnDestroy(): void {
    this.isDestroyed$.next(true);
    this.isDestroyed$.complete();
  }

  private getFileFromEvent($event: Event | DataTransfer): Promise<string> {
    const event = $event as Event;
    event.preventDefault();
    const target = event.target as HTMLInputElement;
    const file = (target?.files ?? ($event as DataTransfer)?.files)[0];

    return this.readUrl(file);
  }

  private readUrl(file: File): Promise<string> {
    return new Promise((res, rej) => {
      const reader = new FileReader();
      reader.onload = (e) => res(e?.target?.result as string);
      reader.onerror = rej;
      reader.readAsDataURL(file);
    });
  }
}
