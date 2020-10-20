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
    private readonly rendererFactory: RendererFactory2
  ) {
    this.isDarkToggled = this.localStorageService.getItemInStorage(
      this.isDarkToggledKey
    ) as boolean;
    // tslint:disable-next-line: no-null-keyword
    this.renderer = rendererFactory.createRenderer(undefined, null);
  }

  init(): void {
    this.applyProperTheme(!!this.isDarkToggled);
  }

  toggleDark(): void {
    this.isDarkToggled = !this.isDarkToggled;
    this.applyProperTheme(this.isDarkToggled);
    this.localStorageService.setItemInStorage(
      this.isDarkToggledKey,
      this.isDarkToggled
    );
  }

  private applyProperTheme(isDarkTheme: boolean): void {
    this.renderer[isDarkTheme ? 'addClass' : 'removeClass'](
      document.body,
      'theme-dark'
    );
  }
}
