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
import { Router } from '@angular/router';
import { Subject, Subscription } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

import { ThemeService } from '../theme.service';
import { User, UserService } from '../user.service';

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
  appVersion = environment.version;
  destinations: Destination[] = [];
  user: User | undefined;
  readonly isUnknownUserAllowedToNavigate = true;
  private readonly isDestroyed$ = new Subject<boolean>();

  constructor(
    private readonly themeService: ThemeService,
    private readonly titleService: Title,
    private readonly metaService: Meta,
    private readonly userService: UserService,
    private readonly router: Router
  ) {
    this.themeService.init();
    // Don't forget to add destinations in template for Angular i18n detection !
    this.destinations = [
      {
        name: $localize`:@@home:Home`,
        path: 'home',
        icon: 'home',
      },
      {
        name: $localize`:@@profile:Profile`,
        path: 'profile',
        icon: 'person',
      },
      {
        name: $localize`:@@articles:Articles`,
        path: 'articles',
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
    this.setTitle();
    this.setMeta();
  }

  onSignout(): void {
    this.userService.delete();
    this.router.navigate(['/auth/signin']);
  }

  trackByIndex(index: number): number {
    return index;
  }

  ngOnDestroy(): void {
    console.info(`💥 destroy: ${this.constructor.name}`);
    this.isDestroyed$.next(true);
    this.isDestroyed$.complete();
  }

  private setTitle(): void {
    this.appTitle = this.appTitleElement?.nativeElement?.textContent as string;
    this.titleService.setTitle(this.appTitle);
  }

  private setMeta(): void {
    this.appDescription = this.appDescriptionElement?.nativeElement
      ?.textContent as string;
    this.metaService.updateTag({
      name: 'description',
      content: this.appDescription,
    });
  }
}
