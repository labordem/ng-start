import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  Input,
  LOCALE_ID,
  OnInit,
  TemplateRef,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { ThemeService } from '../../theme.service';
import { User, UserService } from '../../user.service';

@Component({
  selector: 'app-layout-settings',
  templateUrl: './layout-settings.component.html',
  styleUrls: ['./layout-settings.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LayoutSettingsComponent implements OnInit {
  @Input() user?: User;
  isDarkThemeToggled = false;

  constructor(
    @Inject(LOCALE_ID) readonly localeId: string,
    private readonly themeService: ThemeService,
    private readonly userService: UserService,
    private readonly dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.isDarkThemeToggled = this.themeService.isDarkToggled;
  }

  async onImportImage($event: Event | DataTransfer): Promise<void> {
    const selectedNewImage = await this.getFileFromEvent($event);
    this.userService.update({
      ...(this.user as User),
      avatar: selectedNewImage,
    });
  }

  onSignout(): void {
    this.userService.delete();
  }

  onOpenDialog(templateRef: TemplateRef<Component>): void {
    this.dialog.open(templateRef);
  }

  onCloseDialog(): void {
    this.dialog.closeAll();
  }

  onToggleDarkTheme(): void {
    this.themeService.toggleDark();
    this.isDarkThemeToggled = this.themeService.isDarkToggled;
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
