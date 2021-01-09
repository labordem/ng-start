import { Injectable, Renderer2, RendererFactory2 } from '@angular/core';

import { LocalStorageService } from './local-storage.service';
@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private readonly renderer: Renderer2;
  private readonly isDarkToggledKey = 'isDarkToggled';
  isDarkToggled = false;

  constructor(
    private readonly localStorageService: LocalStorageService,
    private readonly rendererFactory: RendererFactory2,
  ) {
    // tslint:disable-next-line: no-null-keyword
    this.renderer = this.rendererFactory.createRenderer(undefined, null);
  }

  init(): void {
    const themeFromStorage = this.localStorageService.getItemInStorage(
      this.isDarkToggledKey,
    ) as boolean | undefined;

    this.isDarkToggled =
      themeFromStorage !== undefined
        ? (this.isDarkToggled = themeFromStorage)
        : window?.matchMedia('(prefers-color-scheme: dark)')?.matches ?? false;

    this.applyProperTheme(this.isDarkToggled);
  }

  toggleDark(): void {
    this.isDarkToggled = !this.isDarkToggled;
    this.applyProperTheme(this.isDarkToggled);
    this.localStorageService.setItemInStorage(
      this.isDarkToggledKey,
      this.isDarkToggled,
    );
  }

  private applyProperTheme(isDarkTheme: boolean): void {
    this.renderer[isDarkTheme ? 'addClass' : 'removeClass'](
      document.body,
      'theme-dark',
    );
  }
}
