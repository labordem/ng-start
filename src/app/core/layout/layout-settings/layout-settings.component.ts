import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  LOCALE_ID,
  OnInit,
} from '@angular/core';

import { ThemeService } from '../../theme.service';

@Component({
  selector: 'app-layout-settings',
  templateUrl: './layout-settings.component.html',
  styleUrls: ['./layout-settings.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LayoutSettingsComponent implements OnInit {
  isDarkThemeToggled = false;

  constructor(
    @Inject(LOCALE_ID) readonly localeId: string,
    private readonly themeService: ThemeService
  ) {}

  ngOnInit(): void {
    this.isDarkThemeToggled = this.themeService.isDarkToggled;
  }

  onToggleDarkTheme(): void {
    this.themeService.toggleDark();
    this.isDarkThemeToggled = this.themeService.isDarkToggled;
  }
}
