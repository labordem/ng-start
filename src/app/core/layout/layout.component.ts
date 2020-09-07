import {
  AfterViewChecked,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Meta, Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Subject, Subscription } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

import { ThemeService } from '../theme.service';
import { User, UserService } from '../user.service';

interface Destination {
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
  @ViewChild('appTitle') appTitle?: ElementRef<HTMLElement>;
  @ViewChild('appDescription') appDescription?: ElementRef<HTMLElement>;
  destinations: Destination[] = [];
  user: User | undefined;
  version = environment.version;
  private readonly isDestroyed$ = new Subject<boolean>();

  constructor(
    private readonly themeService: ThemeService,
    private readonly titleService: Title,
    private readonly metaService: Meta,
    private readonly userService: UserService,
    private readonly dialog: MatDialog,
    private readonly router: Router
  ) {}

  ngOnInit(): Subscription {
    this.themeService.init();
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

  onOpenDialog(templateRef: TemplateRef<Component>): void {
    this.dialog.open(templateRef);
  }

  onCloseDialog(): void {
    this.dialog.closeAll();
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
    const appTitle = this.appTitle?.nativeElement?.textContent as string;
    this.titleService.setTitle(appTitle);
  }

  private setMeta(): void {
    const description = this.appDescription?.nativeElement
      ?.textContent as string;
    this.metaService.updateTag({
      name: 'description',
      content: description,
    });
  }
}
