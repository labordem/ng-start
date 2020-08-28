import { Injectable, Renderer2, RendererFactory2 } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private readonly renderer: Renderer2;

  isDarkToggled =
    localStorage.getItem('isDarkToggled') === 'true' ? true : false;

  constructor(rendererFactory: RendererFactory2) {
    // tslint:disable-next-line: no-null-keyword
    this.renderer = rendererFactory.createRenderer(undefined, null);
  }

  init(): void {
    this.applyProperTheme(!!this.isDarkToggled);
  }

  toggleDark(): void {
    this.isDarkToggled = !this.isDarkToggled;
    this.applyProperTheme(this.isDarkToggled);
    localStorage.setItem('isDarkToggled', `${this.isDarkToggled}`);
  }

  private applyProperTheme(isDarkTheme: boolean): void {
    this.renderer[isDarkTheme ? 'addClass' : 'removeClass'](
      document.body,
      'theme-dark'
    );
  }
}
