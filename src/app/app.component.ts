import {
  AfterViewChecked,
  Component,
  ElementRef,
  Inject,
  LOCALE_ID,
  ViewChild,
} from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements AfterViewChecked {
  @ViewChild('title') title!: ElementRef<HTMLElement>;
  @ViewChild('description') description!: ElementRef<HTMLElement>;

  isDarkToggled = false;

  languages = [
    { code: 'en-US', label: 'English' },
    { code: 'fr', label: 'Français' },
  ];

  constructor(
    private readonly titleService: Title,
    private readonly metaService: Meta,
    @Inject(LOCALE_ID) readonly localeId: string
  ) {}

  ngAfterViewChecked(): void {
    this.setMeta();
  }

  setMeta(): void {
    const title = this.title.nativeElement.textContent as string;
    this.titleService.setTitle(title);
    const description = this.description.nativeElement.textContent as string;
    this.metaService.updateTag({ name: 'description', content: description });
  }

  trackByIndex(index: number, item: { code: string; label: string }): number {
    return index;
  }
}
