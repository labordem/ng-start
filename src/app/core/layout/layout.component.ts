import {
  AfterViewChecked,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  OnInit,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Meta, Title } from '@angular/platform-browser';
import { Observable } from 'rxjs';
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
export class LayoutComponent implements OnInit, AfterViewChecked {
  @ViewChild('appTitle') appTitle?: ElementRef<HTMLElement>;
  @ViewChild('appDescription') appDescription?: ElementRef<HTMLElement>;
  destinations: Destination[] = [];
  user$: Observable<User>;
  version = environment.version;

  constructor(
    private readonly themeService: ThemeService,
    private readonly titleService: Title,
    private readonly metaService: Meta,
    private readonly userService: UserService,
    private readonly dialog: MatDialog
  ) {
    this.user$ = this.userService.getUser$();
  }

  ngOnInit(): void {
    this.themeService.init();
    this.user$ = this.userService.getUser$();
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

  ngAfterViewChecked(): void {
    this.setTitle();
    this.setMeta();
  }

  onSignout(): void {
    this.userService.deleteUser();
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
