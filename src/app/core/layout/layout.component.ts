import {
  AfterViewChecked,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { Subject, Subscription } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

import { ThemeService } from '../services/theme.service';
import { User, UserService } from '../services/user.service';

export interface Destination {
  name: string;
  path: string;
  icon: string;
}

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LayoutComponent implements OnInit, AfterViewChecked, OnDestroy {
  @ViewChild('appTitleElement') appTitleElement?: ElementRef<HTMLElement>;
  @ViewChild('appDescriptionElement') appDescriptionElement?: ElementRef<
    HTMLElement
  >;

  appTitle = '';
  appDescription = '';
  destinations: Destination[] = [];
  user: User | undefined;
  readonly appVersion = environment.version;
  readonly isUnknownUserAllowedToNavigate = true;
  private readonly isDestroyed$ = new Subject<boolean>();

  constructor(
    private readonly themeService: ThemeService,
    private readonly titleService: Title,
    private readonly metaService: Meta,
    private readonly userService: UserService,
  ) {
    this.themeService.init();
    this.destinations = [
      {
        name: $localize`:@@home:Home`,
        path: 'home',
        icon: 'home',
      },
      {
        name: $localize`:@@articles:Articles`,
        path: 'article',
        icon: 'book',
      },
    ];
  }

  ngOnInit(): Subscription {
    return this.userService.user$.pipe(takeUntil(this.isDestroyed$)).subscribe({
      next: (user) => (this.user = user),
      error: () => (this.user = undefined),
    });
  }

  ngAfterViewChecked(): void {
    this.setMeta();
  }

  ngOnDestroy(): void {
    console.info(`💥 destroy: ${this.constructor.name}`);
    this.isDestroyed$.next(true);
    this.isDestroyed$.complete();
  }

  onSignout(): void {
    this.userService.delete();
  }

  trackByIndex(index: number): number {
    return index;
  }

  private setMeta(): void {
    this.appTitle = this.appTitleElement?.nativeElement?.textContent as string;
    this.titleService.setTitle(this.appTitle);

    this.appDescription = this.appDescriptionElement?.nativeElement
      ?.textContent as string;
    this.metaService.updateTag({
      name: 'description',
      content: this.appDescription,
    });
  }
}
