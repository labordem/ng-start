import {
  AfterViewChecked,
  Component,
  ElementRef,
  Inject,
  LOCALE_ID,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements AfterViewChecked, OnInit {
  @ViewChild('title') title!: ElementRef<HTMLElement>;
  @ViewChild('description') description!: ElementRef<HTMLElement>;

  isDarkToggled =
    localStorage.getItem('isDarkToggled') === 'true' ? true : false;

  languages = [
    { code: 'en-US', label: 'English' },
    { code: 'fr', label: 'Français' },
  ];

  constructor(
    private readonly titleService: Title,
    private readonly metaService: Meta,
    @Inject(LOCALE_ID) readonly localeId: string,
    private readonly renderer: Renderer2
  ) {}

  ngOnInit(): void {
    this.applyProperTheme(!!this.isDarkToggled);
  }

  ngAfterViewChecked(): void {
    this.setMeta();
  }

  toggleDark(): void {
    this.isDarkToggled = !this.isDarkToggled;
    this.applyProperTheme(this.isDarkToggled);
    localStorage.setItem('isDarkToggled', `${this.isDarkToggled}`);
  }

  trackByIndex(index: number): number {
    return index;
  }

  private setMeta(): void {
    const title = this.title.nativeElement.textContent as string;
    this.titleService.setTitle(title);
    const description = this.description.nativeElement.textContent as string;
    this.metaService.updateTag({ name: 'description', content: description });
  }

  private applyProperTheme(isDarkTheme: boolean): void {
    this.renderer[isDarkTheme ? 'addClass' : 'removeClass'](
      document.body,
      'theme-dark'
    );
  }
}
